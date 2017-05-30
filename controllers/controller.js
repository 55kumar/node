// Get the Schemas We need to Enter the Data in their respective keys
var User = require("../models/users");
var comics = require("../models/comics");
var seasons = require("../models/season");
var series = require("../models/series");

exports.SearchData = function (req, res) {
    console.log(req.params.reg);
    var regex = RegExp(req.params.reg);

    comics.find({
        H_Data: regex
    }, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        if ((response || []).length === 0) {
            return res.json("doesn't exit");
        }
        return res.json(response);
    })
};

exports.postUsers = function (req, res) { // Function to Post the Data in Users Collection of Database
    a = User.find({}).sort({id:-1}).limit(1);
    a = a[0];
    a = a.id;
    var user = new User({ // Making Object of Users schema 
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        id : a + 1
        

    });

    user.save(function (err, response) { // Saving the Data into the Database
        if (err) {
            return res.json(req, res, err);
        }

        res.json({
            success: true,
            body: response
        })

    });
};

exports.CheckUsers = function (req, res) {
    username1 = req.body.username;
    password1 = req.body.password;
    console.log(username1);
    var a = User.findOne({
        username: username1,
        password: password1
    }, function (err, response) {
        if (err) {
            return res.json({
                "status": "false"});
        } else {
            if (response.length == 0)
                return res.json({
                "status": "false",
            "message" : "user not found"
        });
            else{
                return res.json({
                "status": "true",
                 "role" : response.role,
                 "meassage" : "logged in"    
        });
        console.log(a);
            }
        }
    });
}





exports.getUsers = function (req, res) { // Function to Get the data from users
    User.find({}, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
}


exports.postcomics = function (req, res) { // Function to Post the comics
    a = User.find({}).sort({comic_id:-1}).limit(1);
    a = a[0];
    a = a.id;
    var comics = new comics({ // Making Object of comics schema 
        name: req.body.name,
        comic_id: a+1,
        season_id: req.body.season_id,
        series_id: req.body.series_id
    });
    title.save(function (err, response) { // Saving the Data into the Database
        if (err) {
            return res.json(req, res, err);
        }
        return res.json({
            success: true,
            body: response
        });

    });
};




exports.postseason = function (req, res) { // Function to post all the season to the collection 
    a = User.find({}).sort({season_id:-1}).limit(1);
    a = a[0];
    a = a.id;
    var Season = new seasons({ // Making Object of season Schema
        name: req.body.name,
        season_id: a+1,
        series_id: req.body.series_id

    });
    Season.save(function (err, response) { // Saving the season into the Database
        if (err) {
            return res.json(req, res, err);
        }

        res.json({
            success: true,
            body: response
        });

    });
};



exports.postseries = function (req, res) { // Function to post all the series to the collection 
    a = User.find({}).sort({series_id:-1}).limit(1);
    a = a[0];
    a = a.id;
    var Series = new series({ 
        name: req.body.name,
        series_id: a+1

    });
    Series.save(function (err, response) { // Saving the series into the Database
        if (err) {
            return res.json(req, res, err);
        }

        res.json({
            success: true,
            body: response
        });

    });
}



exports.getcomics = function (req, res) { // Function to Get the comics from database
    

    
    comics.find({}, function (err, response) { // Function to Find all the comics from collection 
        if (err) {
            return res.json(req, res, err);
        }
        return res.json(response);
    })
}



exports.getseries = function (req, res) { // Function to Get the data from series
   

    series.find({}, function (err, response) { // Function to Find all the series
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
};

exports.getseason = function (req, res) { // Function to Get the data from season
    seasons.find({}, function (err, response) { // Function to Find all the seasons
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
};














exports.getcomicsbyid = function (req, res) { // Function to Get the comics from database
    id = req.params.season_id

    
    comics.find({season_id : id}, function (err, response) { // Function to Find all the comics from collection 
        if (err) {
            return res.json(req, res, err);
        }
        return res.json(response);
    })
}




exports.getseasonbyid = function (req, res) { // Function to Get the data from season
    id = req.params.series_id;
    seasons.find({series_id : id}, function (err, response) { // Function to Find all the seasons
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
};















exports.updateUsers = function (req, res) {
    var id1 = req.body.id;
    User.findOne({
        id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        var username = req.body.username;
        user.username = username;
        user.updated_at = new Date();

        user.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json(response);
        })
    })
}

exports.deleteUsers = function (req, res) {
        id1 = req.body.id;
        User.findOne({
            id: id1
        }, function (err, user) {
            if (err) {
                res.json(err);
            }

            if (user) {
                User.remove({
                    id: id1
                }, function (err) {
                    if (err) {
                        res.json(err);
                    }

                    res.json("success");
                })
            } else {
                res.json("User doesnt exist");
            }
        })
}








exports.deletecomics = function (req, res) {
        id1 = req.body.comics_id;
        comics.findOne({
            id: id1
        }, function (err, user) {
            if (err) {
                res.json(err);
            }

            if (user) {
                User.remove({
                    id: id1
                }, function (err) {
                    if (err) {
                        res.json(err);
                    }

                    res.json("success");
                })
            } else {
                res.json("User doesnt exist");
            }
        })
}


exports.deleteseasons = function (req, res) {
        id1 = req.body.season_id;
        seasons.findOne({
            id: id1
        }, function (err, user) {
            if (err) {
                res.json(err);
            }

            if (user) {
                User.remove({
                    id: id1
                }, function (err) {
                    if (err) {
                        res.json(err);
                    }

                    res.json("success");
                })
            } else {
                res.json("User doesnt exist");
            }
        })
}


exports.deleteseries = function (req, res) {
        id1 = req.body.series_id;
        series.findOne({
            id: id1
        }, function (err, user) {
            if (err) {
                res.json(err);
            }

            if (user) {
                User.remove({
                    id: id1
                }, function (err) {
                    if (err) {
                        res.json(err);
                    }

                    res.json("success");
                })
            } else {
                res.json("User doesnt exist");
            }
        })
}