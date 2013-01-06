/*
 * mashery
 * https://github.com/ExactTarget/node-mashery
 *
 * Copyright (c) 2013 ExactTarget
 * Licensed under the MIT license.
 */

var crypto = require('crypto');
var request = require('request');

function mashery(method, params, config, callback) {

	if (!callback) {
		callback = config;
		config = {};
	}

	if (!mashery._validateConfig(config, callback)) return;

	var signature = mashery._signature(config, Date.now());
	var requestUrl = [config.url, '?apikey=', config.key, '&sig=', signature].join('');

	var command = {
		jsonrpc: '2.0',
		method: method,
		params: params,
		id: 1
	};

	var requestOptions = {
		url: requestUrl,
		method: 'POST',
		body: command,
		json: true
	};

	return mashery._performRequest(requestOptions, callback);
}

mashery.configure = function (config) {
	return function (method, params, callback) {
		return mashery(method, params, config, callback);
	};
};

mashery._validateConfig = function (config, callback) {
	var message = 'mashery not configured - missing url, key, or secret';

	if (config.url && config.key && config.secret) {
		return true;
	} else {
		callback(new Error(message));
		return false;
	}
};

mashery._signature = function (config, now) {
	var timestamp = Math.floor(now / 1000);
	var composite = config.key + config.secret + timestamp;
	return crypto.createHash('md5').update(composite).digest("hex");
};

mashery._performRequest = function (requestOptions, callback) {
	return request(requestOptions, callback);
};

module.exports = mashery;