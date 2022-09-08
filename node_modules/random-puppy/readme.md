# random-puppy [![Build Status](https://travis-ci.org/dylang/random-puppy.svg?branch=master)](https://travis-ci.org/dylang/random-puppy)

> Get a random puppy image url.

<img src="http://i.imgur.com/0zZ8m6B.jpg" width="300px">

## Install

```
$ npm install --save random-puppy
```


## Usage

```js
const randomPuppy = require('random-puppy');

randomPuppy()
    .then(url => {
        console.log(url);
    })

//=> 'http://imgur.com/IoI8uS5'
```


## API

### `randomPuppy()`

Returns a `promise` for a random puppy image url from http://imgur.com/ from https://www.reddit.com/r/puppy

### `randomPuppy(subreddit)`

Returns a `promise` for a random image url from the selected subreddit. *Warning: We cannot promise it will be a image of a puppy!*

### `randomPuppy.all(subreddit)`

Returns an `eventemitter` for getting all random images for a subreddit.

```js
const event = randomPuppy.all(subreddit);
event.on('data', url => console.log(url));
```

Or:
```js
const event = randomPuppy.all('puppies');

Observable.fromEvent(event, 'data')
    .subscribe(data => {
      console.log(data);
    });
```

## Notes

* Node 4 or newer.
* Caches results from imgur in memory.
* Created for the purpose of using in a training exercise on different ways to do async in JavaScript at [Opower](https://opower.com/).

## License

MIT © [Dylan Greene](https://github.com/dylang)
