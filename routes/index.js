const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const HomeController = require('../controller/HomeController');
// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.route('/save-contact').post(ensureAuthenticated,HomeController.postdata);

router.route('/all-contacts').get(ensureAuthenticated, HomeController.getcontacts);

router.route('/edit-page/:id').get(ensureAuthenticated, HomeController.edit);

router.route('/update-contact/:id').post(HomeController.update);

router.route('/delete-contact/:id').get(HomeController.delete);

module.exports = router;