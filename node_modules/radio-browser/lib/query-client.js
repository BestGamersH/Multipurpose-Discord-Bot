
const http = require('http')
const https = require('https')

module.exports = (options, body='') => {

    if (body) {
        options.headers['Content-Length'] = Buffer.byteLength(body)
    }

    let request = (options.protocol === 'https:' ? https : http).request

    return new Promise((resolve, reject) => {
        const req = request(options, (res) => {
            const { statusCode } = res
            let error;
            let rawData = ''

            if (statusCode < 200 || statusCode > 299) {
                error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`)
            }

            if (error) {
                res.resume()
                reject(error)
            }
        
            res.setEncoding('utf8')
            res.on('data', (chunk) => rawData += chunk)
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData)
                }
                catch (e) {
                    reject(e)
                }
            })
        })

        if (options.headers['Content-Length']) {
            req.write(body)
        }

        req.on('error', (e) => reject(e))
        req.end()
    })

}
