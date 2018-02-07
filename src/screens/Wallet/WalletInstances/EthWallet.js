import ethers from 'ethers';

const network = ethers.providers.networks.ropsten;
const provider = ethers.providers.getDefaultProvider(network);
console.log(network, provider);

export default class EthWallet {
  constructor(isMnemonic, mnemonicOrPrivateKey) {
    if (isMnemonic) {
      this._wallet = ethers.Wallet.fromMnemonic(mnemonicOrPrivateKey);
    } else {
      this._wallet = new ethers.Wallet(mnemonicOrPrivateKey);
    }
    this._wallet.provider = provider;
  }

  getBalance = async () => {
    return this._wallet.getBalance();
  }

  getPublicAddress = async () => {
    return this._wallet.getAddress();
  }

  getPrivateKey = async () => {
    return this._wallet.privateKey;
  }

  send = async (amount, toAddress) => {
    return this._wallet.send(toAddress, amount);
  }
}
