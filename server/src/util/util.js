import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  console.log('verifyToken: ', req.cookies.access_token);
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, 'Not authenticated!'));
  }

  console.log('process.env.JWT_SECRET_KEY: ', process.env.JWT_SECRET_KEY);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    console.log('decoded: ', decoded);
    if (err) {
      return next(createError(403, 'Token is not valid!'));
    }
    req.user = decoded;
    next();
  });
};
