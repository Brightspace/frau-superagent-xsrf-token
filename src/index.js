'use strict';

var xsrfToken = require('frau-xsrf-token');

var XSRF_HEADER = 'X-Csrf-Token';

function noop() {}

function isRelative/*ly safe*/(url) {
	return typeof url === 'string'
		&& url.length > 0
		&& url[0] === '/';
}

module.exports = function getXsrfToken(req) {
	var end = req.end;

	req.end = function getXsrfTokenEndOverride(cb) {
		function completeRequest() {
			req.end = end;
			return req.end(cb);
		}

		if (!isRelative(req.url)) {
			return completeRequest();
		}

		xsrfToken()
			.then(function(token) {
				req.set(XSRF_HEADER, token);
			})
			.catch(noop)
			.then(function() {
				// Run this async in another turn
				// So we don't catch errors with our promise
				setTimeout(completeRequest);
			});

		return this;
	};

	return req;
};
