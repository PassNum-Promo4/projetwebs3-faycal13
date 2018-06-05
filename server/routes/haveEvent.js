const router = require('express').Router();
const Post_event = require('../models/post_event');

const checkJwt = require('../middleware/check-jwt');

router.route('/event')
.get(checkJwt, (req, res, next) => {
  Post_event.find({ owner: req.decoded.user._id})
  .populate('owner')
  .populate('category')
  .exec((err, post_event) => {
    if (post_event) {
      res.json({
        success: true,
        message: 'event',
        post_event: post_event
      });
    }
  });
})
.post(checkJwt, (req, res, next) => {
  let event = new Post_event();
  event.owner = req.decoded.user._id;
  event.category = req.body.categoryId;
  event.title = req.body.title;
  event.description = req.body.description;
  event.save();
  res.json({
    success: true,
    message: 'Successfuly added the event'
  });
});
module.exports = router;
