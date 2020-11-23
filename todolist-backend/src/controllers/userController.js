import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

// bcrypt
const SALT_WORK_FACTOR = 10;


const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!'});
    }
}

export const register = (req, res) => {
    console.log('register');
    console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, SALT_WORK_FACTOR);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hashPassword = undefined;
            return res.status(200).json(user); 
        }
    });
}

export const login = (req,res) => {
    console.log('login');
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found'});
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password'});
            } else {
                return res.json({token: jwt.sign({ email: user.email, username: user.username, _id: user.id}, 'RESTFULAPIs')});
            }
        }
    });
}
