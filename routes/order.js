const router = require('express').Router();
const Ravepay = require('ravepay');
const Gig = require('../models/gig');

const PUBLICK_KEY = "FLWPUBK-8f718785a8d26352ada64c437de50b7f-X";
const SECRET_KEY = "FLWSECK-98cf00a5bdde21e3ba96a955e4f33cfc-X";
let ref;
let totalPrice;
const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

const fee = 200;

router.get('/checkout/single_package/:id', (req, res, next) => {

  Gig.findOne({ _id: req.params.id }, function(err, gig) {
    totalPrice = gig.price + fee;
    req.session.price = totalPrice;
    res.render('checkout/single_package', {gig: gig, totalPrice: totalPrice });
  });
});

router.route('/payment')
.get((req, res, next) => {
  res.render('checkout/payment', {totalPrice});
});

router.post('/payment', (req, res, next) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        card_no,
        exp_month,
        exp_year,
        cvv,
        pin
    } = req.body;

    const payload = {
        "cardno": card_no,
        "cvv": cvv,
        "expirymonth": exp_month,
        "expiryyear": exp_year,
        "currency": "NGN",
        "pin": pin,
        "country": "NG",
        "amount": totalPrice,
        "email": email,
        "phonenumber": phone,
        "suggested_auth": "PIN",
        "firstname": firstname,
        "lastname": lastname,
        "IP": "355426087298442",
        "txRef": "MC-7663-YU",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }

    rave.Card.charge(payload).then(resp => {
        ref = resp.body;
        return res.status(200).redirect('/otp');

    }).catch(err => {
        //Handle error
        res.status(400).json({
            'error': err
        })
    })
});

router.route('/otp')
    .get((req, res, next) => {
        res.render('checkout/otp');
    })

    .post((req, res, next) => {
        const { otp } = req.body;
        const payload = {
            "PBFPubKey": PUBLICK_KEY,
            "transaction_reference": ref,
            "otp": otp
        }
        rave.Card.validate(payload).then(resp => {
            return res.status(200).json({
                'message': resp
            });
        })
    });

module.exports = router;
