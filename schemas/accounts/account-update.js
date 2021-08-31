const Joi = require('joi');

const accountUpdateSchema = Joi.object({
  contact: {
    phoneNumber: Joi.string(),
    streetAddressLineOne: Joi.string(),
    streetAddressLineTwo: Joi.string().allow(null),
    city: Joi.string(),
    state: Joi.string(),
    postalCode: Joi.string(),
    country: Joi.string().allow(null),
  },
  identity: {
    fundingSource: Joi.array().items(Joi.string()),
    annualIncomeMin: Joi.string().allow(null),
    annualIncomeMax: Joi.string().allow(null),
    liquidNetWorthMin: Joi.string().allow(null),
    liquidNetWorthMax: Joi.string().allow(null),
    totalNetWorthMin: Joi.string().allow(null),
    totalNetWorthMax: Joi.string().allow(null),
  },
  disclosures: {
    isControlPerson: Joi.boolean(),
    isAffiliatedExchangeOrFinra: Joi.boolean(),
    isPoliticallyExposed: Joi.boolean(),
    immediateFamilyExposed: Joi.boolean(),
    employmentStatus: Joi.string().allow(null),
    employerName: Joi.string().allow(null),
    employerAddress: Joi.string().allow(null),
    employmentPosition: Joi.string().allow(null),
  },
  trustedContact: {
    firstName: Joi.string(),
    lastName: Joi.string(),
    emailAddress: Joi.string().email(),
  },
});

module.exports = accountUpdateSchema;
