var card = require('../lib/rave.card');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("#Rave Card Charge Test", function(){
    describe("# Rave Charge leg test", function() {
         it("should return a 200 status response", function(done) {
             this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
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

         var result = cardInstance.charge(payload);
            expect(result).to.eventually.have.property('statusCode',200).notify(done);  
    });

        it("should return suggested_auth pin", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
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
            var result = cardInstance.charge(payload).then(resp => {
                return resp.body;   
            });
            
            expect(result).to.eventually.have.deep.property("message", "AUTH_SUGGESTION").notify(done);
        })

        it("should return a pending validation response", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
                "suggested_auth": "PIN",
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

            var result = cardInstance.charge(payload).then(resp => {
                return resp.body.data;
            });
            
            expect(result).to.eventually.have.deep.property("chargeResponseCode", "02").notify(done);
  
        })

        it("should throw error email is required", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
                "suggested_auth": "PIN",
                "country": "NG",
                "amount": "10",
                "email": "",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            } 

            var result = cardInstance.charge(payload).catch(err => {
                return err.message;
            })

            expect(result).to.eventually.be.equal("email is required").notify(done);
        })
    })
    // END OF CARD CHARGE TEST
    describe("#Rave Validation leg test", function(){
        it("should return a 200 response", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
                "suggested_auth": "PIN",
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

            Promise.all([
                cardInstance.charge(payload).then(resp => {
                    return resp.body.data.flwRef;
                })
            ]).spread(ref => {

                var payload2 = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "transaction_reference": ref,
                "otp": "12345"
                }

               var result =  cardInstance.validate(payload2).then(resp => {
                    return resp;
                });
                expect(result).to.eventually.have.property('statusCode', 200).notify(done);
            });    
        })
        it("should return a charge response code of 00", function(done){
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
                "suggested_auth": "PIN",
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

            Promise.all([
                cardInstance.charge(payload).then(resp => {
                    return resp.body.data.flwRef;
                })
            ]).spread(ref => {

                var payload2 = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "transaction_reference": ref,
                "otp": "12345"
                }

               var result =  cardInstance.validate(payload2).then(resp => {
                    return resp.body.data.tx;
                });
                expect(result).to.eventually.have.deep.property('chargeResponseCode', '00').notify(done);
            });    
        })
        
        it("should throw error otp is required", function(done) {
            this.timeout(10000);
            var ravebase = new base("FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X", "FLWSECK-bb971402072265fb156e90a3578fe5e6-X", "http://flw-pms-dev.eu-west-1.elasticbeanstalk.com");
            var cardInstance = new card(ravebase);
            var payload = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "cardno": "5438898014560229",
                "cvv": "789",
                "expirymonth": "07",
                "expiryyear": "18",
                "currency": "NGN",
                "pin": "7552",
                "suggested_auth": "PIN",
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

            Promise.all([
                cardInstance.charge(payload).then(resp => {
                    return resp.body.data.flwRef;
                })
            ]).spread(ref => {

                var payload2 = {
                "PBFPubKey": "FLWPUBK-e634d14d9ded04eaf05d5b63a0a06d2f-X",
                "transaction_reference": ref,
                "otp": ""
                }

               var result =  cardInstance.validate(payload2).then(resp => {
                   resp;
               })
               .catch(err => {
                   return err.message;
               })
                expect(result).to.eventually.be.equal("otp is required").notify(done);
            });    
        })
    })
    // END OF VALIDATE CHARGE TEST
})

