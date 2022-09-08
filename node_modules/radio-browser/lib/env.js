// got from https://github.com/flexdinesh/browser-or-node
module.exports = {
    isNode: typeof process !== 'undefined' && process.versions != null && process.versions.node != null,
    isBrowser: typeof window !== 'undefined' && typeof window.document !== 'undefined'
}
