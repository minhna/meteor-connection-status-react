// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by connection-status-react.js.
import { name as packageName } from "meteor/minhna:connection-status-react";

// Write your tests here!
// Here is an example.
Tinytest.add('connection-status-react - example', function (test) {
  test.equal(packageName, "connection-status-react");
});
