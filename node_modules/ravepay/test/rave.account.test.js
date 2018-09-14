var account = require('../lib/rave.account');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("#Rave Account charge test", function() {
    describe("#Rave Account charge leg test", function () {
        it("should return a 200 status response", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var accountInstance = new account(ravebase);
            var payload = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
           var result = accountInstance.charge(payload);
            expect(result).to.eventually.have.property('statusCode', 200).notify(done);
        })

        it("should return a pending validation response", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var accountInstance = new account(ravebase);
            var payload = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
           var result = accountInstance.charge(payload).then(resp => {
               return resp.body.data;
           });
            expect(result).to.eventually.have.deep.property('chargeResponseCode', '02').notify(done);
        })

        it("should throw an error txRef is required", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var accountInstance = new account(ravebase);
            var payload = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
           var result = accountInstance.charge(payload).then(resp => {
               resp.body.data;
           })
            .catch(err => {
                return err.message;
            })
            expect(result).to.eventually.be.equal("txRef is required").notify(done);
        })
    })

    describe("#Rave account validation leg test", function() {
        it("should return a 200 status response", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var accountInstance = new account(ravebase);
            var payload = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }

            Promise.all([
                accountInstance.charge(payload).then(resp => {
                    return resp.body.data.flwRef;
                })
            ]).spread(ref => {
                var payload2 = {
                    "transactionreference": ref,
                    "otp": "12345"
                }

                var result = accountInstance.validate(payload2);
                expect(result).to.eventually.have.property('statusCode', 200).notify(done);
            })  
        })

        it("should return a chargeresponse of 00", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var accountInstance = new account(ravebase);
            var payload = {
                "accountnumber": "0690000004",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            Promise.all([
                accountInstance.charge(payload).then(resp => {
                    return resp.body.data.flwRef;
                })
            ]).spread(ref => {
                var payload2 = {
                    "transactionreference": ref,
                    "otp": "12345"
                }

                var result = accountInstance.validate(payload2).then(resp => {
                    return resp.body.data;
                });
                expect(result).to.eventually.have.deep.property('chargeResponseCode', '00').notify(done);
            })
        })
    })
})