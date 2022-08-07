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
    return next(createError(403, 'Invalid user!'));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const isUserDeleted = await User.findByIdAndDelete(req.params.id);
      console.log('isUserDeleted: ', isUserDeleted);
      if (isUserDeleted) {
        res.status(200).json({
          success: true,
          message: 'User has been deleted',
        });
      }
    } catch (error) {
      return next(error);
    }
  } else {
    next(createError(403, 'Invalid user!'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      next(createError(404, 'Invalid user!'));
    }

    res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    return next(createError(403, 'Invalid user!'));
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $push: { subscribedChannel: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: 1,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Subscribed channel successfull',
    });
  } catch (error) {
    return next(createError(403, 'Invalid channel id!'));
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findById(req.user.id, {
      $pull: { subscribedChannel: req.params.id },
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: -1,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Unsubscribed channel successfull',
    });
  } catch (error) {
    return next(createError(403, 'Invalid channel id!'));
  }
};

export const like = (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};

export const unlike = async (req, res, next) => {
  console.log('Test Controller');
  res.json('hi....user');
};
