var mongoose = require("mongoose");
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// mongoose.connect("mongodb://localhost/yelp_camp");

// app.use(bodyParser.urlencoded({extended: true}));

// var htmlPath = path.join(__dirname, 'assets');
// app.use(express.static(htmlPath));

// app.set("view engine", "ejs");

var data = [
    {
        name: "Salmon Creek", image: "/images/mock_1.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Granite Hill", image: "/images/mock_2.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Mountain Goat's Rest", image: "/images/mock_3.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Ocean Camp", image: "/images/mock_4.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Howling Fjord", image: "/images/mock_5.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Mystic Falls", image: "/images/mock_6.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Falls of Clyde", image: "/images/mock_7.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },
    {
        name: "Granite Waterfall", image: "/images/mock_8.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    },    
    {
        name: "Source of Life", image: "/images/mock_9.jpg", description: "Nulla vitae urna lacus. In euismod facilisis nisl non venenatis. Nam lacinia in risus a ullamcorper. In tristique tempor dictum. Etiam pulvinar, nisl congue dapibus ullamcorper, libero arcu fermentum sem, vitae sollicitudin ligula lacus at ligula. Praesent accumsan, ligula ac efficitur suscipit, nunc dolor rutrum lacus, non porta quam lectus et risus. Praesent ut facilisis augue."
    }
]

function seedDB() {
    Campground.remove({}, function(err) {
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");

            // add few campgrounds
            data.forEach(function(seed){
                Comment.remove({});
                Campground.create(seed, function(err, campground) {
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Created new campground.");
                            // console.log(campground);
                            // create a comment
                            Comment.create({
                                text: "This place is great, but I wish there was internet.",
                                author: "Homer"
                            }, function(err, comment){
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment.");
                                }
                            });
                        }
                    }
                );
            });
        }
    });
}

module.exports = seedDB;

// app.listen(3200, "localhost", function() {
//     console.log("YelpCamp has started!");
// });