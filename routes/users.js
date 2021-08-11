const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');
const User = require("../models/User");
const session = require('express-session');


router.use(session({ secret: 'secret', cookie: { maxAge: 60000 }}))


router.get('/', (req,res) =>{
    User.find()
        .sort({date: -1})
        .then((users) => res.json(users));
});



router.post("/register", async (request, response) => {
    try {
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
        var user = new User(request.body);
        var result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post("/login", async (request, response) => {
    try {
        var user = await User.findOne({ name: request.body.name }).exec();
        if(!user) {
            return response.status(400).send({ message: "The username does not exist" });
        }
        if(!Bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(400).send({ message: "The password is invalid" });
        }
        response.send({ message: "The username and password combination is correct!" });
        //Auth JWT Somewhere here
        jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
    } catch (error) {
        response.status(500).send(error);
    }
});

router.get('/login', (req,res) => {
    res.redirect(307, 'https://discord.com/api/oauth2/authorize?client_id=874710663770017792&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fcallback&response_type=code&scope=identify%20email');
})

router.get('/callback', (req,res) => {
    res.send(req.query);
})

module.exports = router;