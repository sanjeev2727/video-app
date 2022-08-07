import { createError } from '../util/error.js';
import User from '../models/User.js';

export const updateUser = async (req, res, next) => {
  console.log('params: ', req.params);
  console.log('user: ', req.user);

  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
      });
    } catch (error) {
      return next(error);
    }
  } else {
    return next(createError(403, 'You can update your account only!'));
  }
};

export const deleteUser = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};

export const getUser = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};

export const subscribe = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};

export const unsubscribe = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};

export const like = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};

export const unlike = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};
