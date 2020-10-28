
const checkLogin = (req, res, next) => {
    const token = req.session.token;

    if(token === ""){
        return res.render('../views/pages/login.ejs', res);
    }else{
        next()
    }
}

module.exports = checkLogin;