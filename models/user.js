/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const {
  Model,
} = require('sequelize');

const { v4: uuid4 } = require('uuid');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async validPassword(password) {
      // asynchronously check if input password matches password on DB
      const match = await bcrypt.compare(password, this.password);
      return match;
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        // hash password with salt of 2^10 iterations
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user, options) => {
        // hash password with salt of 2^10 iterations
        user.password = await bcrypt.hash(user.password, 10);
      },
      // beforeBulkCreate: (users) => {
      //   users.forEach(async (user) => {
      //     user.password = await bcrypt.hash(user.password, 10);
      //   });
      // },
    },
    sequelize,
    modelName: 'User',
    underscored: true,
  });

  return User;
};
