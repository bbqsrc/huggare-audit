# huggare-audit

Audit with Huggare.

## Usage

```javascript
var Severities = require('huggare').Severities,
    Log = require('huggare-log'),
    Auditor = require('huggare-audit');

// Assumes a user object containing at least a `username` prop.
var user = {
  username: 'test'
};

var audit = new Auditor('TAG', user, [
  'loggedIn',
  'loggedOut',
  {
    name: 'brokeEverything',
    severity: Severities.ERROR,
    message: 'wrecked up the place'
  }
], Log);

audit.loggedIn();
// -> 2015-10-16T06:58:26.322Z [I] AUDIT: (test) logged in

audit.loggedOut();
// -> 2015-10-16T06:58:27.581Z [I] AUDIT: (test) logged out

audit.brokeEverything();
// -> 2015-10-16T06:58:29.056Z [E] AUDIT: (test) wrecked up the place
```
