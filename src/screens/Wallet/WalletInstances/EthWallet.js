import ethers from 'ethers';

const network = ethers.providers.networks.ropsten;
const provider = ethers.providers.getDefaultProvider(network);
console.log(network, provider); //eslint-disable-line no-console

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
