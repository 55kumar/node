var express = require('express'); // Making Object Of Express
var router = express.Router(); // Using Routing Function of Express
var userController = require('../controllers/controller'); //Making Object of Controllers


router.route('/v2/users') // Route to Post and Get Data From and To Users
  // .post(userController.postUsers)
  .get(userController.getUsers)
  
router.route('/v1/users')
  .put(userController.updateUsers)

router.route('/v2/users/:id') 
.delete(userController.deleteUsers)


router.route('/v1/comics') // Route to Post and Get Data From and To comics
  .post(userController.postcomics)
  .put(userController.updatecomics)
  
  
  router.route('/v2/comics')
  .get(userController.getcomics)
  
router.route('/v2/comics/:id') 
.delete(userController.deletecomics)

router.route('/v1/seasons') // Route to Post and Get Data From and To seasons
  .post(userController.postseason)
  .put(userController.updateseasons)

  router.route('/v2/seasons')
  .get(userController.getseason)
  

  router.route('/v2/seasons/:id')
.delete(userController.deleteseasons)

router.route('/v2/Search/:reg') // Search the data
  .get(userController.SearchData);

router.route('/v1/Check') // Route to Check the user is valid or not
  .post(userController.CheckUsers);

router.route('/v1/series') // Route to Post and Get Data From and To series
  .post(userController.postseries)
  .put(userController.updateseries)

  router.route('/v2/series')
  .get(userController.getseries)
 
router.route('/v2/series/:id')
 .delete(userController.deleteseries)



router.route('/v2/seasons/:series_id')
.get(userController.getseasonbyid)


router.route('/v2/comics/:season_id')
.get(userController.getcomicsbyid)

router.route('/v1/verify/email')
.post(userController.verifyemail);

router.route('/v2/verification/:ran')
.get(userController.postUsers)

module.exports = router; // Exporting router
