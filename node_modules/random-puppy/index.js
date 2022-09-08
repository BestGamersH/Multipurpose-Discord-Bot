'use strict';

const got = require('got');
const uniqueRandomArray = require('unique-random-array');
const EventEmitter = require('eventemitter3');

const randomCache = {};

function formatResult(getRandomImage) {
    const imageData = getRandomImage();
    if (!imageData) {
        return;
    }
    return `http://imgur.com/${imageData.hash}${imageData.ext.replace(/\?.*/, '')}`;
}

function storeResults(images, subreddit) {
    const getRandomImage = uniqueRandomArray(images);

    randomCache[subreddit] = getRandomImage;
    return getRandomImage;
}

function randomPuppy(subreddit) {
    subreddit = (typeof subreddit === 'string' && subreddit.length !== 0) ? subreddit : 'puppies';

    if (randomCache[subreddit]) {
        return Promise.resolve(formatResult(randomCache[subreddit]));
    }

    return got(`https://imgur.com/r/${subreddit}/hot.json`, {json: true})
        .then(response => storeResults(response.body.data, subreddit))
        .then(getRandomImage => formatResult(getRandomImage));
}

// silly feature to play with observables
function all(subreddit) {
    const eventEmitter = new EventEmitter();

    function emitRandomImage(subreddit) {
        randomPuppy(subreddit).then(imageUrl => {
            eventEmitter.emit('data', imageUrl + '#' + subreddit);
            if (eventEmitter.listeners('data').length) {
                setTimeout(() => emitRandomImage(subreddit), 200);
            }
        });
    }

    emitRandomImage(subreddit);
    return eventEmitter;
}

function callback(subreddit, cb) {
    randomPuppy(subreddit)
        .then(url => cb(null, url))
        .catch(err => cb(err));
}

// subreddit is optional
// callback support is provided for a training exercise
module.exports = (subreddit, cb) => {
    if (typeof cb === 'function') {
        callback(subreddit, cb);
    } else if (typeof subreddit === 'function') {
        callback(null, subreddit);
    } else {
        return randomPuppy(subreddit);
    }
};

module.exports.all = all;
