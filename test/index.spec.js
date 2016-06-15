'use strict';
var path = require('path');
var helpers = require('yeoman-test');
var assert = require('yeoman-assert');

describe('index', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({name: 'test', id: 'abc'})
  });

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    require('../app');
  });
});
