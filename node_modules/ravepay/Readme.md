# Ravepay Nodejs Library v1.0.0

## Ravepay Services exposed by the library

- Account Charge 
- Card Charge
- USSD Charge
- Fees
- Banks

For more information on the services listed above, visit the [Ravepay website](https://ravepay.co)

## How to use

`npm install ravepay`


 You can get your PUBLICK_KEY and SECRET_KEY from the ravepay dashboard. Go [here](https://ravepay.com/auth/) if you don't have an account.

 
```
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

```
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'http://flw-pms-dev.eu-west-1.elasticbeanstalk.com'

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

```
