// src/controllers/authController.js
const jwt = require("jsonwebtoken");
const { User, PersonalAccessToken } = require("../models");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "7d";

module.exports = {
  async login(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(422).json({ message: "email & password required" });
    }

    // fetch user without vendor association first
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await user.verifyPassword(password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // optionally load vendor if user is_vendor
    let vendor = null;
    if (user.is_vendor) {
      const vendorRow = await user.getVendor(); // requires User.associate to define hasOne Vendor
      if (vendorRow) vendor = vendorRow.toJSON();
    }

    const jti = uuidv4();
    const payload = { sub: user.id, jti };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });

    // store token similar to personal_access_tokens
    await PersonalAccessToken.create({
      tokenable_type: "User",
      tokenable_id: user.id,
      name: "api-token",
      token: token.slice(0, 64),
      abilities: null,
    });

    return res.json({
      user: { ...user.toJSON(), vendor },
      access_token: token,
      token_type: "Bearer",
    });
  },

  async logout(req, res) {
    // to implement: revoke token row; simple placeholder:
    return res.json({
      message:
        "Successfully logged out (implement token revocation middleware)",
    });
  },

  me(req, res) {
    // if you wired auth middleware you can return req.user
    res.json({ user: null });
  },
};
