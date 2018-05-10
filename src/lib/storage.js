import { AsyncStorage } from 'react-native';

const Storage = {
  async set(key, value) {
    try {
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log('Error setting data' + e);
    }
  },

  async get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      // return JSON.parse(value);
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } catch (e) {
      console.log('Error getting data' + e);
    }
  },

  async update(key, value) {
    console.log('UPDATE: init', key, value);

    try {
      // if current value is a string, then overwrite, if not merge objects
      const prevValue = await this.get(key);

      if (typeof prevValue !== typeof value) {
        throw Error('Unable to update different key types.');
      }

      let newValue;

      if (typeof value === 'string') {
        // existing value and new value are both strings
        // so we'll overwrite the existing value
        newValue = value;
      } else if (typeof value === 'object') {
        // existing value and new value are both objects
        // so we'll try to merge the objects
        newValue = { ...prevValue, ...value };
      } else {
        throw Error('Unable to update key');
      }

      return await this.set(key, newValue);
    } catch (e) {
      throw e;
    }
  },

  async delete(key) {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log('Error deleteing data' + e);
    }
  },
};

export const CONTACTS_PREFIX = '@hoard:contacts:';

const Contacts = {
  async get(contactID) {
    return await Storage.get(`${CONTACTS_PREFIX}:${contactID}`);
  },
  async set(contactID, data) {
    return await Storage.set(`${CONTACTS_PREFIX}:${contactID}`, data);
  },

  async getContactsWalletBySymbol(contactID, symbol) {
    const address = await Storage.get(
      `${CONTACTS_PREFIX}:${contactID}:${symbol}`
    );
    // TODO: Return real addresses!
    return `0x123${contactID}xub2ubv9823b${symbol}`;
  },
  async setContactsWalletBySymbol(contactID, symbol, walletAddress) {
    return await Storage.set(
      `${CONTACTS_PREFIX}:${contactID}:${symbol}`,
      walletAddress
    );
  },
};

export default Storage;
export { Contacts };
