import jsonwebtoken from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  console.log('verifyToken: ', req.cookies.access_token);
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, 'Not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    console.log('decoded: ', decoded);
    if (err) {
      return next(createError(403, 'Token is not valid!'));
    }
    req.userId = decoded;
    next();
  });
};
