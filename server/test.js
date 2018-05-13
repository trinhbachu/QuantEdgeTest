'use strict';

require('mocha');
var assert = require('assert');
var server = require('./');

describe('server', function() {
  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      server();
    });
  });

});