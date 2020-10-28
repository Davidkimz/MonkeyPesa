const express = require("express");
const cookie = require("cookie-session");

const app = express();

const setSession = (req, res, next) => {
    //Use Flash and Cookie session
    app.use(cookie({
        name: 'session',
        keys: ['X_732jjUjsakskkd(', ')dtOuQsd$>@A[w'],
        maxAge: 1000 * 60
    }))

    next();
}

app.use(setSession);

