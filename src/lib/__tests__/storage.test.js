import Storage, { Contacts, CONTACTS_PREFIX } from '../storage';

import MockStorage from '../__mocks__/AsyncStorage';

const storageCache = {};
const AsyncStorage = new MockStorage(storageCache);

jest.setMock('AsyncStorage', AsyncStorage);

describe('Local Storage', () => {
  const KEY = 'SOME_KEY';
  const VAL = 'some value';
  const VAL_NEW = 'some new value';
  const VAL_OBJ = { some: 'object' };
  const VAL_NEW_OBJ = { another: 'object' };

  it('SET: Should set a new key', async () => {
    await Storage.set(KEY, VAL);
    const res = await Storage.get(KEY);
    expect(res).toEqual(VAL);
  });

  it('SET: Should set a new key', async () => {
    await Storage.set(KEY, VAL_OBJ);
    const res = await Storage.get(KEY);
    expect(res).toEqual(VAL_OBJ);
  });

  it('GET: Should get an existing key', async () => {
    const res = await Storage.get(KEY);
    expect(res).toEqual(VAL_OBJ);
  });

  it('UPDATE: Should update a key, replacing strings ', async () => {
    await Storage.set(KEY, VAL);
    await Storage.update(KEY, VAL_NEW);
    const res = await Storage.get(KEY);
    expect(res).toEqual(VAL_NEW);
    expect(typeof res).toEqual('string');
  });

  it('UPDATE: Should update a key, merging objects ', async () => {
    await Storage.set(KEY, VAL_OBJ);
    await Storage.update(KEY, VAL_NEW_OBJ);
    const res = await Storage.get(KEY);
    expect(res).toEqual({ ...VAL_OBJ, ...VAL_NEW_OBJ });
    expect(typeof res).toEqual('object');
  });

  it('UPDATE: Should throw an error trying to update keys of different types', async () => {
    await Storage.set(KEY, VAL);
    try {
      await Storage.update(KEY, VAL_NEW_OBJ);
    } catch (e) {
      expect(e.message).toMatch('Unable to update different key types.');
    }
    const res = await Storage.get(KEY);
    expect(res).toEqual(VAL);
    expect(typeof res).toEqual('string');
  });

  it('DELETE: should delete key', async () => {
    // Delete only specific keys
    await Storage.delete(KEY);
    const res = await Storage.get(KEY);

    // And we don't delete others
    await Storage.set('safeKey', 'safe');
    const safeRes = await Storage.get('safeKey');

    expect(res).toEqual(null);
    expect(safeRes).toEqual('safe');
  });
});

describe('Contacts Storage', () => {
  const contact = 'test@hoardinvest.com';
  const contactData = { name: 'testing' };

  it('Should save a user', async () => {
    await Contacts.set(contact, contactData);
    const user = await Contacts.get(contact);
    expect(user).toEqual(contactData);
  });

  it('Should get a user', async () => {
    const user = await Contacts.get(contact);
    expect(user).toEqual(contactData);
  });

  it('Should set and get a user wallet address', async () => {
    const ethWallet = `0x123${contact}xub2ubv9823bETH`;
    const neoWallet = `0x123${contact}xub2ubv9823bNEO`;

    await Contacts.setContactsWalletBySymbol(contact, 'ETH', ethWallet);
    await Contacts.setContactsWalletBySymbol(contact, 'NEO', neoWallet);

    let address = await Contacts.getContactsWalletBySymbol(contact, 'ETH');
    expect(address).toEqual(ethWallet);

    address = await Contacts.getContactsWalletBySymbol(contact, 'NEO');
    expect(address).toEqual(neoWallet);
  });
});
