const express = require('express');
let router = express.Router();
const Resort = require('../controllers/resort');

router
  .route('/manage')
  .post(Resort.postResort)
  .get(Resort.fetchAllResorts)
  .patch(Resort.updateResort);

router.route('/manage/:id').get(Resort.getById).delete(Resort.delete);

module.exports = router;
