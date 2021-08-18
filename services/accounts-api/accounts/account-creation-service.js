/* eslint-disable max-len */
// const snakeCaseKeys = require('snakecase-keys');
const { BrokerageAccount } = require('../../../models');

// const alpacaAccountCreationGateway = require('../../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountCreationService = {

  async createBrokerageAccount(accountObject) {
    // Converts object keys to snake case because Alpaca needs snake casessss
    // const alpacaAccountObject = snakeCaseKeys(accountObject, { deep: true });

    // const alpacaResponse = await alpacaAccountCreationGateway.createAlpacaBrokerageAccount(alpacaAccountObject);
    const alpacaResponse = { success: true, message: { accountStatus: 'ACTIVE', currency: 'USD' } };
    // If alpaca response returned error, just return the response
    if (!alpacaResponse.success) {
      return alpacaResponse;
    }

    const {
      identity: {
        givenName: firstName,
        familyName: lastName,
        dateOfBirth,
        taxId,
        taxIdType,
        countryOfCitizenship,
        countryOfBirth,
        countryOfTaxResidence,
        fundingSource,
      },
      contact: {
        phoneNumber,
        streetAddressLineOne,
        streetAddressLineTwo,
        city,
        state,
        postalCode,
        country,
      },
      disclosures: {
        isControlPerson,
        isAffiliatedExchangeOrFinra,
        isPoliticallyExposed,
        immediateFamilyExposed,
      },
      trustedContact: {
        givenName: trustedContactFirstName,
        familyName: trustedContactLastName,
        emailAddress: trustedContactEmailAddress,
      },
    } = accountObject;

    const { accountStatus, currency } = alpacaResponse.message;
    const accountNumber = 0;
    // Create entry in database
    const brokerageAccount = await BrokerageAccount.create({
      accountNumber,
      status: accountStatus,
      currency,
      firstName,
      lastName,
      dateOfBirth,
      taxId,
      taxIdType,
      countryOfCitizenship,
      countryOfBirth,
      countryOfTaxResidence,
      fundingSource,
      phoneNumber,
      streetAddressLineOne,
      streetAddressLineTwo,
      city,
      state,
      postalCode,
      country,
      isControlPerson,
      isAffiliatedExchangeOrFinra,
      isPoliticallyExposed,
      immediateFamilyExposed,
      trustedContactFirstName,
      trustedContactLastName,
      trustedContactEmailAddress,
    });

    const brokerageResponse = {
      success: true, /// FIX THIS TO NEW CONST FILE
      message: brokerageAccount.id,
    };
    return brokerageResponse;
  },

};

module.exports = accountCreationService;
