# frau-superagent-xsrf-token

[![NPM version][npm-image]][npm-url]
[![Coverage Status][coverage-image]][coverage-url]

[Superagent][superagent] plugin to add XSRF tokens in a D2L free range
application ([frau](https://www.npmjs.com/browse/keyword/frau)).

## Install
```sh
npm install frau-superagent-xsrf-token --save
```

## Usage
```js
var request = require('superagent'),
	xsrfToken = require('frau-superagent-xsrf-token');

request
	.post('/foo/bar')
	.use(xsrfToken)
	.end(function () {})
```

__Note:__ XSRF tokens will only be added to requests to relative URLs.

## Testing

```bash
npm test
```


## Contributing

1. **Fork** the repository. Committing directly against this repository is
   highly discouraged.

2. Make your modifications in a branch, updating and writing new unit tests
   as necessary in the `spec` directory.

3. Ensure that all tests pass with `npm test`

4. `rebase` your changes against master. *Do not merge*.

5. Submit a pull request to this repository. Wait for tests to run and someone
   to chime in.

### Code Style

This repository is configured with [EditorConfig][EditorConfig] and
[ESLint][ESLint] rules.

## Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.

[npm-url]: https://www.npmjs.org/package/frau-superagent-xsrf-token
[npm-image]: https://img.shields.io/npm/v/frau-superagent-xsrf-token.svg
[coverage-url]: https://coveralls.io/r/Brightspace/frau-superagent-xsrf-token?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/frau-superagent-xsrf-token.svg

[superagent]: https://visionmedia.github.io/superagent/

[EditorConfig]: http://editorconfig.org/
[ESLint]: http://eslint.org
