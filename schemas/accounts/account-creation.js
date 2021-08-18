const Joi = require('joi');

const accountCreationSchema = Joi.object({
  contact: {
    emailAddress: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    streetAddressLineOne: Joi.string().required(),
    streetAddressLineTwo: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string(),
  },
  identity: {
    givenName: Joi.string().required(),
    familyName: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    taxId: Joi.string().required(),
    taxIdType: Joi.string().required(),
    countryOfCitizenship: Joi.string(),
    countryOfBirth: Joi.string(),
    countryOfTaxResidence: Joi.string().required(),
    fundingSource: Joi.string().required(),
    annualMinIncome: Joi.string(),
    annualMaxIncome: Joi.string(),
    liquidNetWorthMin: Joi.string(),
    liquidNetWorthMax: Joi.string(),
    totalNetWorthMin: Joi.string(),
    totalNetWorthMax: Joi.string(),
  },
  disclosures: {
    isControlPerson: Joi.boolean().required(),
    isAffiliatedExchangeOrFinra: Joi.boolean().required(),
    isPoliticallyExposed: Joi.boolean().required(),
    immediateFamilyExposed: Joi.boolean().required(),
    employmentStatus: Joi.string(),
    employerName: Joi.string(),
    employerAddress: Joi.string(),
    employmentPosition: Joi.string(),
  },
  agreements: Joi.array().items(
    {
      agreement: Joi.string().required(),
      signedAt: Joi.date().required(),
      ipAddress: Joi.string().ip(),
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
      documentSubType: Joi.string(),
      id: Joi.string().uuid().required(),
      mimeType: Joi.string().required(),
      createdAt: Joi.date().timestamp().required(),
    },
  ),
  trustedContact: {
    givenName: Joi.string().required(),
    familyName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
  },
});

module.exports = accountCreationSchema;
