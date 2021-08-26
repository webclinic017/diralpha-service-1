/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

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

    async updatePassword(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      this.update({ password: hashedPassword });
    }

    updateLastLogin() {
      const currentTime = new Date();
      this.update({ lastLogin: currentTime });
    }

    async isValidPassword(password) {
      // asynchronously check if input password matches password on DB
      const match = await bcrypt.compare(password, this.password);
      return match;
    }
  }
  User.init({
    emailAddress: DataTypes.STRING,
    password: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
  },
  {
    hooks: {
      beforeCreate: async (user, options) => {
        // hash password with salt of 2^10 iterations
        user.lastLogin = new Date();
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
    sequelize,
    tableName: 'users',
    modelName: 'User',
    underscored: true,
  });

  return User;
};
