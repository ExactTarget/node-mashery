var mashery = require('../lib/mashery.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['module basics'] = {
	'initializes': function (test) {
		test.expect(2);
		test.equal(typeof mashery, 'function', 'mashery should be a function');
		test.equal(typeof mashery.configure, 'function', 'mashery.configure should be a function');
		test.done();
	},

	'validates missing config': function (test) {
		test.expect(2);
		mashery('method', {}, function (error) {
			test.ok(error instanceof Error, 'should call callback with error object');
			test.equal(typeof error.message, 'string', 'error should contain a string message');
			test.done();
		});
	},

	'validates empty config': function (test) {
		test.expect(2);
		mashery('method', {}, {}, function (error) {
			test.ok(error instanceof Error, 'should call callback with error object');
			test.equal(typeof error.message, 'string', 'error should contain a string message');
			test.done();
		});
	}
};

exports['mashery requests and config'] = {
	setUp: function (done) {
		this._performRequest = mashery._performRequest;
		this._signature = mashery._signature;

		mashery._performRequest = function (requestOptions, callback) {
			callback(null, requestOptions);
		};

		mashery._signature = function (config) {
			return 'mysignature' + config.secret;
		};

		done();
	},

	tearDown: function (done) {
		mashery._performRequest = this._performRequest;
		mashery._signature = this._signature;

		done();
	},

	'handles a basic request': function (test) {
		test.expect(2);

		mashery('mymethod', { paramOne: 'one' }, { url: 'xxx', key: 'yyy', secret: 'zzz' }, function (error, requestOptions) {
			test.ifError(error);

			test.deepEqual(requestOptions, {
				url: 'xxx?apikey=yyy&sig=mysignaturezzz',
				method: 'POST',
				body: { jsonrpc: '2.0', method: 'mymethod', params: { paramOne: 'one' }, id: 1 },
				json: true
			}, 'should construct the appropriate request');

			test.done();
		});
	},

	'manages separate configurations': function (test) {
		test.expect(4);

		var masherya = mashery.configure({ url: 'aaa', key: 'bbb', secret: 'ccc' });
		var masheryx = mashery.configure({ url: 'xxx', key: 'yyy', secret: 'zzz' });

		masherya('mymethod', { paramOne: 'one' }, function (error, requestOptions) {
			test.ifError(error);

			test.deepEqual(requestOptions, {
				url: 'aaa?apikey=bbb&sig=mysignatureccc',
				method: 'POST',
				body: { jsonrpc: '2.0', method: 'mymethod', params: { paramOne: 'one' }, id: 1 },
				json: true
			}, 'should construct the appropriate masherya request');
		});

		masheryx('mymethod2', { paramOne: 'two' }, function (error, requestOptions) {
			test.ifError(error);

			test.deepEqual(requestOptions, {
				url: 'xxx?apikey=yyy&sig=mysignaturezzz',
				method: 'POST',
				body: { jsonrpc: '2.0', method: 'mymethod2', params: { paramOne: 'two' }, id: 1 },
				json: true
			}, 'should construct the appropriate masheryx request');

			test.done();
		});
	}
};

exports['mashery signature'] = {
	'computes a known signature': function (test) {
		test.expect(1);
		var timestamp = 1357504962558;
		var signature = mashery._signature({ key: 'xxx', secret: 'yyy'}, timestamp);
		test.equal(signature, 'dcba2289afc3c75a902a0d33a8dbe6ae', 'signature should match known value');
		test.done();
	}
};