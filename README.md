

# pcify
Tiny wrapper that make function can use both promise and callback style.

# install
    npm install pcify

# how to use
pcify is can be wrapped in current existing code. make your old callback function become async/await ready.
or can be use in your npm project make your API can use both promise and callback. in writing style of your choice.
Example.

    function someCallbackFunction(data, callback) {
	    setTimeout(() => callback(null, true), 100);
    }
	// someCallbackFunction(data, (ret) => { ... });

    function somePromiseFunction(data) {
	    return new Promise((resolve, reject) => {
		    setTimeout(() => resolve(true), 100);
	    });
    }
	// somePromiseFunction(data).then((ret) => { ... });
	// or
	// let ret = await somePromiseFunction(data);

to

    const pc = require('pcify');

    function someCallbackFunction(data, callback) {
	    return pc.callback(callback, callback => {
		    setTimeout(() => callback(null, true), 100);
	    });
    }
	// someCallbackFunction(data).then(...);
	// or
	// let ret = await someCallbackFunction(data);
	// or
	// someCallbackFunction(data, callback);
	
    function somePromiseFunction(data, callback) {
	    return pc.promise(callback, (resolve, reject) => {
		    setTimeout(() => resolve(true), 100);
	    });
    }
	// somePromiseFunction(data).then(...);
	// or
	// let ret = await somePromiseFunction(data);
	// or
	// somePromiseFunction(data, callback);
	
# Shorthand

pc.p === pc.promise
pc.c === pc.callback


# requirement
your node.js need to be ES6 supported (6+). (currently tested on node v8)

if you want to promisify your callback function
 - your callback function are expected to be return error on first argument.
 - if your callback function is dynamically selected (eg. your callback is last argument) you need to add wrapper after the callback has been declared.

if you want to callbackify your promise function
 - only work if your function return Promise
 - just add callback to your last arugment and replace `return new Promise(` with `return pc.promise(callback,`