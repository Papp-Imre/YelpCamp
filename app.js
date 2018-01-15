var path = require('path');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
 var seedDB = require("./test/seeds");

 mongoose.connect("mongodb://localhost/yelp_camp");
 seedDB();

app.use(bodyParser.urlencoded({extended: true}));

var htmlPath = path.join(__dirname, 'assets');
app.use(express.static(htmlPath));

app.set("view engine", "ejs");

// MENU - NAVBAR
var menuitems = [
    {name: "home", text: "Home", href: "/", collapse: false, active: true, dropdowngroup: ""},
    {name: "campgrounds", text: "Campgrounds", href: "/campgrounds", collapse: false, active: false, dropdowngroup: ""},
    {name: "login", text: "Login", href: "/", collapse: true, active: false, dropdowngroup: "User actions"},
    {name: "signup", text: "Sign up", href: "/", collapse: true, active: false, dropdowngroup: "User actions"},
    {name: "logout", text: "Log out", href: "/", collapse: true, active: false, dropdowngroup: "User actions"}
]

// local variables for view
app.locals.menuitems = menuitems;
app.locals.application_title = "YelpCamp";

// ROUTES
// ----------------------------------------------------------------------

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

app.post("/addcampground", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    // Create a new campground in DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ============================
// COMMENTS ROUTES
// ============================
app.post("/campgrounds/:id/comments", function(req, res) {
    // lookup campground using ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save(function (err) {
                        if (err) {
                            return console.log(err);
                        } else {
                            // redirect campground show page
                            res.redirect('/campgrounds/'+ campground._id);
                        }
                    });
                }
            });
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//app.get("/copythis", function(req, res) {

app.listen(3000, "localhost", function() {
    console.log("YelpCamp has started!");
});