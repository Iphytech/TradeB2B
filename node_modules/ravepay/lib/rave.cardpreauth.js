var preauthCard = require('../services/rave.preauth');
var voidCard = require('../services/rave.preauth.void');
var refundCard = require('../services/rave.preauth.refund');
var captureCard = require('../services/rave.preauth.capture');

function Preauth(Ravebase) {

    this.preauth = function(data) {
        return preauthCard(data, Ravebase);
    }

    this.void = function(data) {
        return voidCard(data, Ravebase);
    }

    this.refund = function(data) { 
        return refundCard(data, Ravebase);
    }

    this.captureCard = function(data) {
        return captureCard(data, Ravebase);
    }

}

module.exports = Preauth;