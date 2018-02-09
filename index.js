"use strict";

/**
 * https://github.com/newz/pcify
 */

const pcify = {};

pcify.p = pcify.promise = (callback, fn) => {
	if(callback) {
		return fn(data => {
			callback(null, data);
		},
		err => {
			callback(err);
		});
	}
	return new Promise(fn);
}


pcify.c = pcify.callback = (callback, fn) => {
	if(callback) {
		return fn(callback);
	}
	return new Promise((resolve, reject) => {
		fn((err, data) => {
			if(err) {
				return reject(err);
			}
			resolve(data);
		});
	});
}

module.exports = pcify;