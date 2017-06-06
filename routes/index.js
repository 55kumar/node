var express = require('express'); // Making Object Of Express
var router = express.Router(); // Using Routing Function of Express
var userController = require('../controllers/controller'); //Making Object of Controllers


router.route('/v1/users') // Route to Post and Get Data From and To Users
  .post(userController.postUsers)
  .get(userController.getUsers)
  .put(userController.updateUsers)

router.route('/v1/users/:id') 
.delete(userController.deleteUsers)


router.route('/v1/comics') // Route to Post and Get Data From and To comics
  .post(userController.postcomics)
  .get(userController.getcomics)
  .put(userController.updatecomics)
  
router.route('/v1/comics/:id') 
.delete(userController.deletecomics)

router.route('/v1/seasons') // Route to Post and Get Data From and To seasons
  .post(userController.postseason)
  .get(userController.getseason)
  .put(userController.updateseasons)
  

  router.route('/v1/seasons/:id')
.delete(userController.deleteseasons)

router.route('/v1/Search/:reg') // Search the data
  .get(userController.SearchData);

router.route('/v1/Check') // Route to Check the user is valid or not
  .post(userController.CheckUsers);

router.route('/v1/series') // Route to Post and Get Data From and To series
  .post(userController.postseries)
  .get(userController.getseries)
  .put(userController.updateseries)
 
router.route('/v1/series/:id')
 .delete(userController.deleteseries)



router.route('/v1/seasons/:series_id')
.get(userController.getseasonbyid)


router.route('/v1/comics/:season_id')
.get(userController.getcomicsbyid)

module.exports = router; // Exporting router