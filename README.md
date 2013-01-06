# mashery

Client for Mashery API

## Getting Started
Install the module with: `npm install mashery`

```javascript
// Load and configure the module
var mashery = require('mashery').configure({
	url: 'https://api.mashery.com/v2/json-rpc/000',
	key: 'xxxxxxxxxxxxxxxxxxxxxxxx',
	secret: 'xxxxxxxxxx'
});

// Prepare the request
var parameters = {
	service_key: 'xxxxxxxxxxxxxxxxxxxxxxxx',
	client: {
		client_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
		client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxx'
	},
	token_data: {
		grant_type: 'client_credentials'
	}
};

// Call the API (this example creates an OAuth token)
mashery('oauth2.createAccessToken', parameters, function (error, response, body) {
	if (error) {
		console.log(error);
	} else {
		console.log(body);
	}
});
```

## Release History

_This module is semantically versioned: <http://semver.org>_

### Version 0.1.0 `2013-01-06`

* Initial release

## Contributing
Before writing code, we suggest you [search for issues](https://github.com/ExactTarget/node-mashery/issues?state=open)
or [create a new one](https://github.com/ExactTarget/node-mashery/issues/new) to confirm where your contribution fits into
our roadmap.

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.
Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## Acknowledgements

We are grateful to the following maintainers, contributors, and sponsors of the technologies used by this module.

* [Node.js](http://nodejs.org)

* [Request](https://github.com/mikeal/request) (De facto HTTP request module for Node)

* [grunt](https://github.com/cowboy/grunt) (Build tool for JavaScript projects)

##Authors

**Adam Alexander**

+ http://twitter.com/adamalex
+ http://github.com/adamalex

## Copyright and license

Copyright (c) 2013 ExactTarget

Licensed under the MIT License (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the COPYING file.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.