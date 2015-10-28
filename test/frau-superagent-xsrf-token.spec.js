'use strict';

var expect = require('chai').expect,
	nock = require('nock'),
	request = require('superagent');

var XSRF_TOKEN = require('frau-xsrf-token/src/storage').set('foo-bar-baz');

var xsrf = require('../');

describe('frau-superagent-xsrf-token', function () {
	it('should add xsrf token for relative URLs', function (done) {
		var endpoint = nock('http://localhost')
			.matchHeader('X-Csrf-Token', XSRF_TOKEN)
			.get('/api')
			.reply(200);

		request
			.get('/api')
			.use(xsrf)
			.end(function () {
				endpoint.done();
				done();
			});
	});

	it('should not add xsrf token for non-relative URLs', function (done) {
		var endpoint = nock('http://localhost')
			.get('/api')
			.reply(200);

		var req = request
			.get('http://localhost/api')
			.use(xsrf)
			.end(function () {
				expect(req.req._headers).not.to.have.property('x-csrf-token');
				endpoint.done();
				done();
			});
	});
});
