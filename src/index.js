'use strict';

var xsrfToken = require('frau-xsrf-token');

var XSRF_HEADER = 'X-Csrf-Token';

function noop () {}

module.exports = function getXsrfToken (req) {
	var end = req.end;

	req.end = function getXsrfTokenEndOverride (cb) {
		xsrfToken()
			.then(function (token) {
				req.set('X-Csrf-Token', token);
			})
			.catch(noop)
			.then(function () {
				// Run this async in another turn
				// So we don't catch errors with our promise
				setTimeout(function () {
					req.end = end;
					req.end(cb);
				});
			});
	};
};
