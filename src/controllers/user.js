const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.signup = async (req, resp) => {

    try {
        const myUser = await User.findOne({ email: req.body.email })

        if (myUser) {
            return resp.status(400).json({ message: 'admin is already register' })
        }

        var salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass

        })
        const saveUser = await newUser.save()
        return resp.status(200).json({ savedUser: saveUser })


    } catch (error) {
        console.error(error.message);
        //  res.status(500).send("internal server error");
        return resp.status(500).json({ error: "internal server error" });
    }







}


exports.login = async (req, resp) => {
    try {
        const loggedinUser = await User.findOne({ email: req.body.email })
        if (!loggedinUser) {
            return resp.status(400).json({ error: 'email is not exist' })
        }
        const passMatch = await bcrypt.compare(req.body.password, loggedinUser.password);
        if (!passMatch) {
            return resp.status(400).json({ error: 'password is not matching' })
        }

        const token = jwt.sign({ _id: loggedinUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const { _id, name, email } = loggedinUser

        resp.status(200).json({
            token,
            user: { _id, name, email }
        })


    } catch (error) {
        console.error(error.message);
        //  res.status(500).send("internal server error");
        return resp.status(500).json({ error: "internal server error" });
    }

}

