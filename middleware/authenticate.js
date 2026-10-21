import { verifyAccessToken } from '../utils/jwt.js';

export function authenticate(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'No token provided.',
    });
  }

  const token = authorization.slice('Bearer '.length);
  const verified = verifyAccessToken(token);

  if (!verified) {
    return res.status(401).json({
      error: 'Invalid or expired token.',
    });
  }

  req.user = verified;
  return next();
}
