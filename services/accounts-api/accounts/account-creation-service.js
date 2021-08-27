/* eslint-disable max-len */
const snakeCaseKeys = require('snakecase-keys');
const { BrokerageAccount, User } = require('../../../models');

const alpacaAccountCreationGateway = require('../../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountCreationService = {

  convertToAlpacaJSONSyntax(accountDataObject) {
    // bs code needed to change to alpaca's required syntax for their API

    const alpacaAccountDataObject = snakeCaseKeys(accountDataObject, { deep: true });

    // changes address lines to array of lines
    alpacaAccountDataObject.contact.street_address = [accountDataObject.contact.streetAddressLineOne];

    // adds line two if available
    if (accountDataObject.contact.streetAddressLineTwo) {
      alpacaAccountDataObject.contact.street_address.push(accountDataObject.contact.streetAddressLineTwo);
    }

    // transforms other fields, look at
    // https://alpaca.markets/docs/broker/api-references/accounts/accounts/#request-1
    // for more info
    alpacaAccountDataObject.identity.funding_source = [accountDataObject.identity.fundingSource];
    alpacaAccountDataObject.identity.given_name = accountDataObject.identity.firstName;
    alpacaAccountDataObject.identity.family_name = accountDataObject.identity.lastName;
    alpacaAccountDataObject.trusted_contact.given_name = accountDataObject.trustedContact.firstName;
    alpacaAccountDataObject.trusted_contact.family_name = accountDataObject.trustedContact.lastName;

    // delete transformed fields
    delete alpacaAccountDataObject.contact.street_address_line_one;
    delete alpacaAccountDataObject.contact.street_address_line_two;
    delete alpacaAccountDataObject.identity.first_name;
    delete alpacaAccountDataObject.identity.last_name;
    delete alpacaAccountDataObject.trusted_contact.first_name;
    delete alpacaAccountDataObject.trusted_contact.last_name;

    return alpacaAccountDataObject;
  },

  async createBrokerageAccount(currentUser, accountDataObject) {
    // Converts object keys to snake case because Alpaca needs snake casessss
    const alpacaAccountDataObject = this.convertToAlpacaJSONSyntax(accountDataObject);

    const { id: UserId } = currentUser.dataValues;

    const alpacaResponse = await alpacaAccountCreationGateway.createAlpacaBrokerageAccount(alpacaAccountDataObject);

    // If alpaca response returned error, just return the response
    if (!alpacaResponse.success) {
      return alpacaResponse;
    }

    // destructure fields
    const {
      identity: {
        firstName,
        lastName,
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
        firstName: trustedContactFirstName,
        lastName: trustedContactLastName,
        emailAddress: trustedContactEmailAddress,
      },
    } = accountDataObject;

    const { status, currency, account_number: accountNumber } = alpacaResponse.message;

    const account = {
      accountNumber,
      status,
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
    };
    
    // Create entry in database
    let brokerageAccount = null;
    try {
      brokerageAccount = await BrokerageAccount.create({
        ...account,
        UserId,
      }, {
        include: [User],
      });
    } catch (error) {
      return {
        success: false,
        timestamp: new Date(),
        message: error,
      };
    }

    const brokerageResponse = {
      success: true, /// FIX THIS TO NEW CONST FILE
      message: {
        id: brokerageAccount.id,
        accountNumber,
        createdAt: brokerageAccount.createdAt,
        status: brokerageAccount.status,
      },
      timestamp: new Date(),
    };

    return brokerageResponse;
  },

};

module.exports = accountCreationService;
