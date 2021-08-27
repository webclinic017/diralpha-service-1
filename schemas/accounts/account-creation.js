const Joi = require('joi');

const accountCreationSchema = Joi.object({
  contact: {
    emailAddress: Joi.string(),
    phoneNumber: Joi.string().required(),
    streetAddressLineOne: Joi.string().required(),
    streetAddressLineTwo: Joi.string().allow(null),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().allow(null),
  },
  identity: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    taxId: Joi.string().required(),
    taxIdType: Joi.string().required(),
    countryOfCitizenship: Joi.string().allow(null),
    countryOfBirth: Joi.string().allow(null),
    countryOfTaxResidence: Joi.string().required(),
    fundingSource: Joi.array().items(Joi.string()).required(),
    annualIncomeMin: Joi.string().allow(null),
    annualIncomeMax: Joi.string().allow(null),
    liquidNetWorthMin: Joi.string().allow(null),
    liquidNetWorthMax: Joi.string().allow(null),
    totalNetWorthMin: Joi.string().allow(null),
    totalNetWorthMax: Joi.string().allow(null),
  },
  disclosures: {
    isControlPerson: Joi.boolean().required(),
    isAffiliatedExchangeOrFinra: Joi.boolean().required(),
    isPoliticallyExposed: Joi.boolean().required(),
    immediateFamilyExposed: Joi.boolean().required(),
    employmentStatus: Joi.string().allow(null),
    employerName: Joi.string().allow(null),
    employerAddress: Joi.string().allow(null),
    employmentPosition: Joi.string().allow(null),
  },
  agreements: Joi.array().items(
    {
      agreement: Joi.string().required(),
      signedAt: Joi.date().required(),
      ipAddress: Joi.string().ip().allow(null),
    },
  ),
  documents: Joi.array().items(
    {
      documentType: Joi.string().required(),
      documentSubType: Joi.string(),
      content: Joi.string().base64().required(),
      mimeType: Joi.string().required(),
    },
    {
      documentType: Joi.string().required(),
      documentSubType: Joi.string().allow(null),
      id: Joi.string().uuid().required(),
      mimeType: Joi.string().required(),
      createdAt: Joi.date().timestamp().required(),
    },
  ),
  trustedContact: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
  },
});

module.exports = accountCreationSchema;
