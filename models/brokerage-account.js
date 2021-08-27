/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BrokerageAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  BrokerageAccount.init({
    accountNumber: DataTypes.STRING,
    status: DataTypes.STRING,
    currency: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    taxId: DataTypes.STRING,
    taxIdType: DataTypes.STRING,
    countryOfCitizenship: DataTypes.STRING,
    countryOfBirth: DataTypes.STRING,
    countryOfTaxResidence: DataTypes.STRING,
    fundingSource: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    streetAddressLineOne: DataTypes.STRING,
    streetAddressLineTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    isControlPerson: DataTypes.BOOLEAN,
    isAffiliatedExchangeOrFinra: DataTypes.BOOLEAN,
    isPoliticallyExposed: DataTypes.BOOLEAN,
    immediateFamilyExposed: DataTypes.BOOLEAN,
    trustedContactFirstName: DataTypes.STRING,
    trustedContactLastName: DataTypes.STRING,
    trustedContactEmailAddress: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'brokerage_accounts',
    modelName: 'BrokerageAccount',
    underscored: true,
  });
  return BrokerageAccount;
};
