const jwt = require('jsonwebtoken');
const { Token, User } = require('../models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthenticated' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Unauthenticated' });

    const token = parts[1];
    const payload = jwt.verify(token, JWT_SECRET);
    const jti = payload.jti;
    if (!jti) return res.status(401).json({ message: 'Invalid token' });

    // check token exists in DB and not expired
    const tokenRow = await Token.findOne({ where: { jti } });
    if (!tokenRow) return res.status(401).json({ message: 'Token revoked' });

    // attach user
    const user = await User.findByPk(payload.sub, { include: ['vendor'] });
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    req.tokenRow = tokenRow;
    req.token = token;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthenticated' });
  }
};
