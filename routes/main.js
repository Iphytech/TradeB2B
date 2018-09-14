const router = require('express').Router();
const async = require('async');
const Gig = require('../models/gig');
const User = require('../models/user');

router.get('/', (req, res, next) => {
      Gig.find({}, function(err, gigs){
      return  res.render('main/home', { gigs: gigs});
      })
});

router.get('/my-gigs', (req, res, next) => {

  return res.render('main/my-gigs');
});

router.route('/add-new-gig')
.get((req, res, next) => {
  Gig.find({ owner: req.user._id }, function(err, gigs){
    return res.render('main/add-new-gig', { gigs: gigs});
  })
})
.post((req, res, next) => {
  async.waterfall([
    function(callback) {
      var gig = new Gig();
      gig.owner = req.user._id;
      gig.title = req.body.gig_title;
      gig.category =  req.body.gig_category;
      gig.about = req.body.gig_about;
      gig.price = req.body.gig_price;
      gig.save(function(err) {
        callback(err, gig);
      });
    },
    function(gig, callback) {
      User.update(
        {
        _id: req.user._id

      },
      {
        $push: { gigs: gig._id }
        }, function(err, count) {
          return res.redirect('/my-gigs');
        }
      )
    }
  ]);
});

router.get('/service_detail/:id', (req,res, next) => {

  Gig.findOne({ _id: req.params.id })
  .populate('owner')
  .exec(function(err, gig) {
    return res.render('main/service_detail', {gig: gig });
  });
});

module.exports = router;
