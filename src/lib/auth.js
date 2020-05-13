//exporta un metodo para saber si esta logeado o no 

module.exports = {

    isLoggedIn(req, res, next) {

        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');

    },


    isNotLoggeIn(req,res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};