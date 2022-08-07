import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { createError } from '../util/error.js';

export const signup = async (req, res, next) => {
  console.log('body: ', req.body);
  try {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      email,
      password: hash,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log('Signup error: ', error);
    next(createError(500, 'Something went wrong!, please try again'));
  }
};

export const signin = async (req, res, next) => {
  console.log('signin: ', req.body);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    console.log('user: ', user);

    if (!user) {
      return next(createError(401, 'Wrong crendential!, please try again'));
    }

    const isValidUser = bcrypt.compareSync(password, user.password);

    console.log('isValidUser: ', isValidUser);

    if (!isValidUser) {
      return next(createError(401, 'Wrong crendential!, please try again'));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    }); //'1h'

    const { password: userPassword, ...otherInfo } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60),
      })
      .status(200)
      .json(otherInfo);
  } catch (error) {
    console.log('Signup error: ', error);
    next(createError(500, 'Something went wrong!, please try again'));
  }
};

export const google = async (req, res) => {};

export const facebook = async (req, res) => {};

export const twitter = async (req, res) => {};
