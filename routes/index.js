var express = require('express'); // Making Object Of Express
var router = express.Router(); // Using Routing Function of Express
var userController = require('../controllers/controller'); //Making Object of Controllers


router.route('/v1/users') // Route to Post and Get Data From and To Users
  .post(userController.postUsers)
  .get(userController.getUsers)
  .delete(userController.deleteUsers)
  .put(userController.updateUsers)


router.route('/v1/comics') // Route to Post and Get Data From and To comics
  .post(userController.postcomics)
  .get(userController.getcomics);


router.route('/v1/seasons') // Route to Post and Get Data From and To seasons
  .post(userController.postseason)
  .get(userController.getseason);

router.route('/v1/Search/:reg') // Search the data
  .get(userController.SearchData);

router.route('/v1/Check') // Route to Check the user is valid or not
  .post(userController.CheckUsers);

router.route('/v1/series') // Route to Post and Get Data From and To series
  .post(userController.postseries)
  .get(userController.getseries);



module.exports = router; // Exporting router