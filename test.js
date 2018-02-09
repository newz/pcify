const pc = require('./');

//

function someCallbackFunctionWrapped(data, callback) {
	return pc.callback(callback, callback => {
	    setTimeout(() => callback(null, 'return someCallbackFunctionWrapped function Data: ' + data), 500);
	});
}

function somePromiseFunctionWrapped(data, callback) {
	return pc.promise(callback, (resolve, reject) => {
	    setTimeout(() => resolve('return somePromiseFunctionWrapped function Data: ' + data), 500);
    });
}


async function a() {
	let retA1 = await someCallbackFunctionWrapped('await 1');
	console.log(retA1);
	let retA2 = await somePromiseFunctionWrapped('await 2');
	console.log(retA2);
	someCallbackFunctionWrapped('callback 1', (err, retC1) => {
		console.log(retC1);
		somePromiseFunctionWrapped('callback 2', (err, retC2) => {
			console.log(retC2);
			console.log('test completed.');
		});
	});
}

a();