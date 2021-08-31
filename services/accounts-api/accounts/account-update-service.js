/* eslint-disable max-len */
const snakeCaseKeys = require('snakecase-keys');
const { BrokerageAccount } = require('../../../models');

const alpacaAccountUpdateGateway = require('../../../alpaca-gateway/broker/accounts/account-update-gateway');

const accountDetailsService = {

  convertToAlpacaJSONSyntax(accountDataObject) {
    // bs code needed to change to alpaca's required syntax for their API

    const alpacaAccountDataObject = snakeCaseKeys(accountDataObject, { deep: true });

    // changes address lines to array of lines
    if (accountDataObject.contact && accountDataObject.contact.streetAddressLineOne) {
      alpacaAccountDataObject.contact.street_address = [accountDataObject.contact.streetAddressLineOne];
    }
    // adds line two if available
    if (accountDataObject.contact && accountDataObject.contact.streetAddressLineTwo != null) {
      alpacaAccountDataObject.contact.street_address.push(accountDataObject.contact.streetAddressLineTwo);
    }
    // transforms other fields, look at
    // https://alpaca.markets/docs/broker/api-references/accounts/accounts/#request-1
    // for more info
    if (accountDataObject.identity && accountDataObject.identity.firstName) {
      alpacaAccountDataObject.identity.given_name = accountDataObject.identity.firstName;
    }
    if (accountDataObject.identity && accountDataObject.identity.lastName) {
      alpacaAccountDataObject.identity.family_name = accountDataObject.identity.lastName;
    }
    if (accountDataObject.trustedContact && accountDataObject.trustedContact.firstName) {
      alpacaAccountDataObject.trusted_contact.given_name = accountDataObject.trustedContact.firstName;
    }
    if (accountDataObject.trustedContact && accountDataObject.trustedContact.firstName) {
      alpacaAccountDataObject.trusted_contact.family_name = accountDataObject.trustedContact.lastName;
    }
    // delete transformed fields
    if (alpacaAccountDataObject.contact && alpacaAccountDataObject.contact.street_address_line_one) {
      delete alpacaAccountDataObject.contact.street_address_line_one;
    }
    if (alpacaAccountDataObject.contact && alpacaAccountDataObject.contact.street_address_line_two) {
      delete alpacaAccountDataObject.contact.street_address_line_two;
    }
    if (alpacaAccountDataObject.identity && alpacaAccountDataObject.identity.first_name) {
      delete alpacaAccountDataObject.identity.first_name;
    }
    if (alpacaAccountDataObject.identity && alpacaAccountDataObject.identity.last_name) {
      delete alpacaAccountDataObject.identity.last_name;
    }
    if (alpacaAccountDataObject.trusted_contact && alpacaAccountDataObject.trusted_contact.first_name) {
      delete alpacaAccountDataObject.trusted_contact.first_name;
    }
    if (alpacaAccountDataObject.trusted_contact && alpacaAccountDataObject.trusted_contact.last_name) {
      delete alpacaAccountDataObject.trusted_contact.last_name;
    }

    return alpacaAccountDataObject;
  },

  async updateBrokerageAccountDetails(currentUser, accountId, accountDataObject) {
    let account;

    try {
      account = await BrokerageAccount.findOne({ where: { id: accountId, UserId: currentUser.dataValues.id } });
    } catch (error) {
      return {
        success: false,
        timestamp: new Date(),
        message: error,
      };
    }

    let response;

    if (account !== null) {
      const { alpacaAccountId } = account;

      let alpacaAccountDataObject;
      try {
        alpacaAccountDataObject = this.convertToAlpacaJSONSyntax(accountDataObject);
      } catch (error) {
        return { message: error };
      }

      const alpacaResponse = await alpacaAccountUpdateGateway.updateAlpacaBrokerageAccount(alpacaAccountId, alpacaAccountDataObject);

      if (alpacaResponse.success) {
        try {
          const y = {
            ...accountDataObject.contact, ...accountDataObject.identity, ...accountDataObject.disclosures, ...accountDataObject.trustedContact,
          };

          account.update(y);
        } catch (error) {
          return { message: error };
        }

        response = {
          sucess: true,
          timestamp: new Date(),
          message: {
            local: account,
            alpaca: alpacaResponse.message,
          },
        };
      } else {
        response = {
          success: false,
          timestamp: new Date(),
          error: alpacaResponse.message,
        };
      }
    } else {
      response = {
        success: false,
        timestamp: new Date(),
        message: `Account ${accountId} for user ${currentUser.dataValues.emailAddress} could not be found`,
      };
    }
    return response;
  },

};

module.exports = accountDetailsService;
