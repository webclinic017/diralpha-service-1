/* eslint-disable max-len */
const snakeCaseKeys = require('snakecase-keys');
const { BrokerageAccount, User } = require('../../../models');

const alpacaAccountCreationGateway = require('../../../alpaca-gateway/broker/accounts/account-creation-gateway');

const accountCreationService = {

  convertToAlpacaJSONSyntax(currentUser, accountDataObject) {
    // bs code needed to change to alpaca's required syntax for their API
    const alpacaAccountDataObject = snakeCaseKeys(accountDataObject, { deep: true });

    // changes address lines to array of lines
    alpacaAccountDataObject.contact.street_address = [accountDataObject.contact.streetAddressLineOne];

    // adds line two if available
    if (accountDataObject.contact.streetAddressLineTwo != null) {
      alpacaAccountDataObject.contact.street_address.push(accountDataObject.contact.streetAddressLineTwo);
    }

    if (!accountDataObject.contact.emailAddress) {
      alpacaAccountDataObject.contact.email_address = currentUser.dataValues.emailAddress;
    }

    // transforms other fields, look at
    // https://alpaca.markets/docs/broker/api-references/accounts/accounts/#request-1
    // for more info
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

  structureAccountData(accountDataObject, alpacaResponse) {
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

    const {
      status, currency, account_number: accountNumber, id: alpacaAccountId,
    } = alpacaResponse.message;

    const account = {
      accountNumber,
      alpacaAccountId,
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

    return account;
  },

  isUniqueUser(UserId) {
    return BrokerageAccount.findOne({ where: { UserId } })
      .then((token) => token !== null)
      .then((found) => !found);
  },

  async createBrokerageAccount(currentUser, accountDataObject) {
    const { id: UserId } = currentUser.dataValues;

    // check if a brokerage account already exists or not
    const isUniqueUser = await this.isUniqueUser(UserId);

    if (!isUniqueUser) {
      return {
        success: false,
        timestamp: new Date(),
        message: 'A brokerage account already exists for this user.',
      };
    }
    // Converts object keys to snake case because Alpaca needs snake casessss
    const alpacaAccountDataObject = this.convertToAlpacaJSONSyntax(currentUser, accountDataObject);

    const alpacaResponse = await alpacaAccountCreationGateway.createAlpacaBrokerageAccount(alpacaAccountDataObject);

    // If alpaca response returned error, just return the response
    if (!alpacaResponse.success) {
      return alpacaResponse;
    }

    const account = this.structureAccountData(accountDataObject, alpacaResponse);

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
        accountNumber: alpacaResponse.message.account_number,
        createdAt: brokerageAccount.createdAt,
        status: brokerageAccount.status,
      },
      timestamp: new Date(),
    };

    return brokerageResponse;
  },

};

module.exports = accountCreationService;
