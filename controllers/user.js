const User = require("../models/user");

module.exports.renderSignupForm = (req, res)=> {
    res.render("./users/signup.ejs");
};

module.exports.signUp = async (req,res) => {
    try{
        let {username, email, password} = req.body;
    const newuser = new User({
        email,
        username
    });
    const registereduser = await User.register(newuser, password);
    req.login(registereduser, (err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to wanderlust");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=> {
    res.render("./users/login.ejs");
};

module.exports.login = async(req,res) => {
    req.flash("success", "Welcome back to Wanderlust! You are loged in!");
    if(!res.locals.redirectUrl){
        res.redirect("/listings");
    }
    else{
        res.redirect(res.locals.redirectUrl);
    }
};

module.exports.logout = (req, res ,next)=> {
    req.logOut((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
}