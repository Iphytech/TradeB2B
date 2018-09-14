var preauth = require('../lib/rave.cardpreauth');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);


describe("#Rave Preauth service test", function(){
    describe("#rave preauthorise card test", function(){
        it("should a 200 response status", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "cardno": "5399830213766064",
                "cvv": "825",
                "expirymonth": "08",
                "expiryyear": "17",
                "currency": "NGN",
                "pin": "9457",
                "country": "NG",
                "amount": "10",
                "charge_type": "preauth",
                "email": "tester@flutter.co",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            var result = preauthInstance.preauth(payload).then(resp => {
                console.log("preauth transaction: ", resp.body.data);
                return resp.body.data;
            });
             expect(result).to.eventually.have.property('chargeResponseCode', '00').notify(done);
        })

        it("should return a an error message that property charge_type is required", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "cardno": "5399830213766064",
                "cvv": "825",
                "expirymonth": "08",
                "expiryyear": "17",
                "currency": "NGN",
                "pin": "9457",
                "country": "NG",
                "amount": "10",
                "email": "tester@flutter.co",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            var result = preauthInstance.preauth(payload).catch(err => {
                return err.message;
            });
             expect(result).to.eventually.be.equal('charge_type is required').notify(done);
        })
    })

    describe("#rave void transaction test", function(){
        it("should return a void successful response", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29518",
                "action": "void",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body;
            });
             expect(result).to.eventually.have.deep.property('message', 'Refund or void complete').notify(done);
        })

        it("should return a success status in the data object from response.", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29518",
                "action": "void",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body.data;
            });
             expect(result).to.eventually.have.property('status', 'success').notify(done);
        })
    })

    describe("#Rave refund transaction test", function(){
        it("should return a refund complete message", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29508",
                "action": "refund",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body;
            });
             expect(result).to.eventually.have.deep.property('message', 'Refund or void complete').notify(done);
        })

        it("should return a success status in the data object from response.", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-8cd258c49f38e05292e5472b2b15906e-X", "FLWSECK-c51891678d48c39eff3701ff686bdb69-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29508",
                "action": "refund",
                "SECKEY": "FLWSECK-c51891678d48c39eff3701ff686bdb69-X"
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body.data;
            });
             expect(result).to.eventually.have.property('status', 'success').notify(done);
        })
    })
})
