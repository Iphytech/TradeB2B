var base     = require('./lib/rave.base'); 
var card     = require('./lib/rave.card');
var account  = require('./lib/rave.account');
var status   = require('./lib/rave.status');
var mobile   = require('./lib/rave.mobile');
var misc     = require('./lib/rave.misc');
var preauth = require('./lib/rave.cardpreauth');
var security = require('./lib/security');
var custom   = require('./lib/rave.custom');


var Rave = function (public_key, public_secret, base_url_or_production_flag)
{

	var ravebase = new base(public_key, public_secret, base_url_or_production_flag);

	this.Card          = new card(ravebase);
	this.Status        = new status(ravebase);
	this.Account       = new account(ravebase);
	this.MobileOptions = new mobile(ravebase);
	this.Misc          = new misc(ravebase);
	this.Preauth 	   = new preauth(ravebase); 
	this.security      = security; 
	this.CustomRequest = new custom(ravebase); 

	this.getIntegrityHash = function (data) { return ravebase.getIntegrityHash(data); }

	

} 

module.exports = Rave;