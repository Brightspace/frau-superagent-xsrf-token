'use strict';

var expect = require('chai').expect,
	nock = require('nock'),
	request = require('superagent');

var XSRF_TOKEN = require('frau-xsrf-token/src/storage').set('foo-bar-baz');

var xsrf = require('../');

describe('frau-superagent-xsrf-token', function() {

	it('should add xsrf token for relative URLs', function(done) {
		let reqSpy;
		request
			.get('/api')
			.use(xsrf)
			.use((req) => reqSpy = req)
			.end(function() {
				expect(reqSpy.header).to.have.property('X-Csrf-Token', XSRF_TOKEN);
				done();
			});
	});

	it('should not add xsrf token for non-relative URLs', function(done) {
		nock('http://some-host').get('/api').reply(200);

		let reqSpy;
		request
			.get('http://some-host/api')
			.use(xsrf)
			.use((req) => reqSpy = req)
			.then(function() {
				expect(reqSpy.header).not.to.have.property('X-Csrf-Token');
				done();
			});
	});
});
