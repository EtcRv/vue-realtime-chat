const { User } = require("../models");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function jwtSignUp(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();

      res.send({
        user: userJson,
        token: jwtSignUp(userJson),
      });
    } catch (err) {
      res.status(400).send({
        error: "This email account is already in use",
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(403).send({
          error: "The login information was incorrect ",
        });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(403).send({
          error: "Email or password were wrong",
        });
      }

      const userJson = user.toJSON();

      return res.send({
        user: userJson,
        token: jwtSignUp(userJson),
      });
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to log in",
      });
    }
  },
  async getAllUsers(req, res) {
    try {
      const user = await User.findAll();

      res.send(user);
    } catch (err) {
      res.status(500).send({
        error: err,
      });
    }
  },
  async getUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);

      res.send(user);
    } catch (err) {
      console.log("Error in get user: ", err);
      res.status(500).send({
        error: "Something wrong",
      });
    }
  },
  async searchUser(req, res) {
    try {
      let users = null;
      const search = req.query.search;
      if (search) {
        users = await User.findAll({
          where: {
            name: {
              [Op.like]: `%${search}%`,
            },
          },
        });
      } else {
        users = await User.findAll();
      }

      res.send(users);
    } catch (err) {
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
};
