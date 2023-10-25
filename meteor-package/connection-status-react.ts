import { checkNpmVersions } from "meteor/tmeasday:check-npm-versions";

import ConnectionStatus from "./status";

// This package requires React 16.8 (hooks support) or later.
checkNpmVersions({ react: ">=16.8.0" }, "minhna:connection-status-react");

export { ConnectionStatus };

// Variables exported by this module can be imported by other packages and
// applications. See connection-status-react-tests.js for an example of importing.
export const name = "connection-status-react";
