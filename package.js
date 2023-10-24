Package.describe({
  name: "minhna:connection-status-react",
  version: "0.0.3",
  // Brief, one-line summary of the package.
  summary: "React component for connection status",
  // URL to the Git repository containing the source code for this package.
  git: "https://github.com/minhna/meteor-connection-status-react",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom("2.0");
  api.use("ecmascript");
  api.use("typescript");
  api.use("react-meteor-data@1.0.0 || 2.0.0");

  api.mainModule("connection-status-react.ts", "client", { lazy: true });
});

Package.onTest(function (api) {
  api.use("ecmascript");
  api.use("tinytest");
  api.use("minhna:connection-status-react");
  api.mainModule("connection-status-react-tests.js");
});
