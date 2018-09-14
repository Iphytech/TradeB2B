# 🌵🌴A simple Experiment🌴🌵

Imagine it is possible to auto-create tests from specs defined for your Services / Endpoint routes.

A couple of assumptions about the basic things we write tests for :

* We test to assert that required values are supplied.
* We test to assert that required values are supplied and that they are correct e.g. valid email e.t.c.
* We test to assert thatt required values are supplied, they are correct and the correct action taken / response gotten.

The above three form at least 65% of test coverage for any given service / endpoint / controller. Using [morx](https://www.npmjs.com/package/morx), 
it should be pretty easy to auto create test-suites for the 3 things above (given no further customizations are needed).
If further customizations are needed, the framework that will use [morx](https://www.npmjs.com/package/morx) to create these tests can be made flexible enough to account for the customizations.  

A typical [morx](https://www.npmjs.com/package/morx) spec declaration looks like this:
```
var morx = require('morx');
var spec = morx.spec() //Begin spec-ing parameters
           .build('id', 'required:true, map:user_id')
           .build('username', 'required:true')
           .end(); //End parameter spec-ing
```

With the above alone, we can create a test suite that asserts the validation of required parameters for whichever service uses
the spec.

Still considering this spec:
```
var morx = require('morx');
var spec = morx.spec() //Begin spec-ing parameters
           .build('id', 'required:true, map:user_id, eg:123, eg_invalid:abc')
           .build('username', 'required:true, eg:glentworth, eg_invalid:1111')
           .end(); //End parameter spec-ing
```
We can add additional properties to make our auto-test suite creation slightly easier:
`eg` : Valid expected data for the said parameter
`eg_invalid_data` : Sample wrong data for said parameter e.g. `wuejdhsh` in place where a valid email is required


Combine the above with [moir](https://www.npmjs.com/package/moir) to generate random values for every test suite needed.
See example [here](https://github.com/4y0/morxcha/tree/master/examples)
