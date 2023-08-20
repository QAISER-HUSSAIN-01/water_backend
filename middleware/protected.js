import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

export default verifyToken;
