import ethers from "ethers";
import Config from 'react-native-config';

import { SYMBOL_ETH } from "containers/App/constants";

const network = Config.ETHNET;  // Ex: <Project Root>/.env.test
const provider = ethers.providers.getDefaultProvider(network);

if (__DEV__) {
  console.log(network, provider); //eslint-disable-line no-console
}

export default class EthWallet {
  constructor(isMnemonic, mnemonicOrPrivateKey) {
    if (isMnemonic) {
      this._wallet = ethers.Wallet.fromMnemonic(mnemonicOrPrivateKey);
    } else if (!isMnemonic && mnemonicOrPrivateKey) {
      this._wallet = new ethers.Wallet(mnemonicOrPrivateKey);
    } else {
      this._wallet = new ethers.Wallet.createRandom();
    }

    this._wallet.provider = provider;
  }

  symbol = SYMBOL_ETH;

  getBalance = async () => {
    return this._wallet.getBalance();
  };

  getPublicAddress = async () => {
    return this._wallet.getAddress();
  };

  getPrivateKey = async () => {
    return this._wallet.privateKey;
  };

  send = async (amount, toAddress) => {
    return this._wallet.send(toAddress, amount);
  };
}
