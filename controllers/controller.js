// Get the Schemas We need to Enter the Data in their respective keys
var User = require("../models/users");
var Comics = require("../models/comics");
var Seasons = require("../models/season");
var Series = require("../models/series");
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var email = require ('../email.json');
const nodemailer = require('nodemailer');
var temp = require('../models/tempuseres')

exports.SearchData = function (req, res) {
    console.log(req.params.reg);
    var regex = RegExp(req.params.reg);

    Comics.find({
        name: regex
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
    var ran = req.params.ran;
    temp.findOne({random : ran}, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
else{
        var user = new User({ // Making Object of Users schema 
            email: response.email,
            password: md5(response.password),
            role: response.role,
            id: response.id,
            verified : true


        });
        console.log(user);

        user.save(function (err, response) { // Saving the Data into the Database
            if (err) {
                return res.json(req, res, err);
            }

            res.json({
                success: true,
                body: response
            })

        });

}

    })
}

exports.CheckUsers = function (req, res) {
    username1 = req.body.username;
    password1 = req.body.password;
    console.log(username1);
    var a = User.findOne({
        username: username1,
        password: md5(password1)
    }, function (err, response) {
        if (err) {
            return res.json({
                "status": "false"
            });
        } else {
            if (response.length == 0)
                return res.json({
                    "status": "false",
                    "message": "user not found"
                });
            else {
                var token = jwt.sign({role : response.role}, "salt")
                return res.json({
                    "status": "true",
                    "role": response.role,
                    "meassage": "logged in",
                    // "token" : token

                });
                console.log(a);
            }
        }
    });
}





exports.getUsers = function (req, res) { // Function to Get the data from users
    User.find({
        "role": {
            $ne: "SA"
        }
    }, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
}




exports.postcomics = function (req, res) { // Function to Post the Data in Users Collection of Database
    Comics.find({}, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
        a = response[0].comic_id
        var comics = new Comics({ // Making Object of comics schema 
            name: req.body.name,
            comic_id: a + 1,
            season_id: req.body.season_id,
            series_id: req.body.series_id
        });
        comics.save(function (err, response) { // Saving the Data into the Database
            if (err) {
                return res.json(req, res, err);
            }

            res.json({
                success: true,
                body: response
            })

        });
    }).sort({
        comic_id: -1
    }).limit(1);
}





exports.postseason = function (req, res) { // Function to Post the Data in Users Collection of Database
    Seasons.find({}, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
        a = response[0].season_id
        var season = new Seasons({ // Making Object of season Schema
            name: req.body.name,
            season_id: a + 1,
            series_id: req.body.series_id

        });
        season.save(function (err, response) { // Saving the Data into the Database
            if (err) {
                return res.json(req, res, err);
            }

            res.json({
                success: true,
                body: response
            })

        });
    }).sort({
        season_id: -1
    }).limit(1);
}






exports.postseries = function (req, res) { // Function to Post the Data in Users Collection of Database
    Series.find({}, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
        a = response[0].series_id
        var series = new Series({
            name: req.body.name,
            series_id: a + 1

        });
        series.save(function (err, response) { // Saving the Data into the Database
            if (err) {
                return res.json(req, res, err);
            }

            res.json({
                success: true,
                body: response
            })

        });
    }).sort({
        series_id: -1
    }).limit(1);
}





exports.getcomics = function (req, res) { // Function to Get the comics from database



    Comics.find({}, function (err, response) { // Function to Find all the comics from collection 
        if (err) {
            return res.json(req, res, err);
        }
        return res.json(response);
    })
}



exports.getseries = function (req, res) { // Function to Get the data from series


    Series.find({}, function (err, response) { // Function to Find all the series
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
};

exports.getseason = function (req, res) { // Function to Get the data from season
    Seasons.find({}, function (err, response) { // Function to Find all the seasons
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
};














exports.getcomicsbyid = function (req, res) { // Function to Get the comics from database
    id = req.params.season_id


    Comics.find({
        season_id: id
    }, function (err, response) { // Function to Find all the comics from collection 
        if (err) {
            return res.json(req, res, err);
        }
        return res.json(response);
    })
}




exports.getseasonbyid = function (req, res) { // Function to Get the data from season
    id = req.params.series_id;
    Seasons.find({
        series_id: id
    }, function (err, response) { // Function to Find all the seasons
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

        var email = req.body.email;
        user.email = email;

        var password = md5(req.body.password) || user.password;
        user.password = password;
        // user.updated_at = new Date();

        user.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json(response);
        })
    })
}

exports.deleteUsers = function (req, res) {
    console.log("delete user api hit");
    id1 = req.params.id;
    console.log(req.body);
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
    id1 = req.params.id;
    Comics.findOne({
        comic_id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            Comics.remove({
                comic_id: id1
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
    id1 = req.params.id;
    Seasons.findOne({
        season_id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            Seasons.remove({
                season_id: id1
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

    Comics.find({
        season_id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            Comics.remove({
                season_id: id1
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
    id1 = req.params.id;
    Series.findOne({
        series_id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            Series.remove({
                series_id: id1
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


    Seasons.find({
        series_id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            Seasons.remove({
                series_id: id1
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

    Comics.find({
        series_id: id1
    }, function (err, user) {
        if (err) {
            res.json(err);
        }

        if (user) {
            Comics.remove({
                series_id: id1
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





exports.updateseries = function (req, res) {
    var id1 = req.body.series_id;
    Series.findOne({
        series_id: id1
    }, function (err, series) {
        if (err) {
            res.json(err);
        }

        var name = req.body.name || series.name;
        series.name = name;


        // user.updated_at = new Date();

        series.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json(response);
        })
    })
}
 

exports.updateseasons = function (req, res) {
    var id1 = req.body.season_id;
    Seasons.findOne({
        season_id: id1
    }, function (err, season) {
        if (err) {
            res.json(err);
        }

        var name = req.body.name || season.name;
        season.name = name;
        var seriesid = req.body.series_id || season.series_id;
        season.series_id = seriesid;



        // user.updated_at = new Date();

        season.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json(response);
        })
    })
}





exports.updatecomics = function (req, res) {
    var id1 = req.body.comic_id;
    Comics.findOne({
        comic_id: id1
    }, function (err, comic) {
        if (err) {
            res.json(err);
        }

        var name = req.body.name || comic.name;
        comic.name = name;
        var seriesid = req.body.series_id || comic.series_id;
        comic.series_id = seriesid;
        var seasonid = req.body.season_id || comic.season_id;
        comic.season_id = seasonid;

        // user.updated_at = new Date();

        comic.save(function (err, response) {
            if (err) {
                res.json(err);
            }

            res.json(response);
        })
    })
}

exports.verifyemail = function (req, res) {

 var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

randomise = text; 
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({ 
    service: 'Gmail',
    host: 'smtpout.secureserver.net', 
    port: 465, 
    auth: { user: email.user, pass: email.pass },
    secure: true
});
url = "http://localhost:4000/api/v2/verification/" + randomise;
// setup email data with unicode symbols
let mailOptions = {
    from: '"kartik chawla" <kchawla1995@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'welcome', // Subject line
    text: 'you have just signed up for manga click on the link to verify your email' + url, // plain text body
//   html : <a href = 'url' >click here to verify</a>
}

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


temp.find({}, function (err, response) { // Function to Find all the Users from collection 
        if (err) {
            return res.json(req, res, err);
        }
        a =  response[0].id

        var tempuser = new temp({ // Making Object of Users schema 
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            verified : false,
            id: a + 1,
            random : randomise


        });
        // console.log(user);

        tempuser.save(function (err, response) { // Saving the Data into the Database
            if (err) {
                return res.json(req, res, err);
            }

            res.json({
                success: true,
                body: response
            })

        });



    }).sort({
        id: -1
    }).limit(1);
};







