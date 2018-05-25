import bip39 from 'react-native-bip39';
import Bitcoin from 'bitcoinjs-lib';
import Config from 'react-native-config';

import { SYMBOL_BTC } from "containers/App/constants";

const config = {
  endpoint: Config.BTC_NODE_ENDPOINT,
  network: Bitcoin.networks[Config.BTC_NODE_NETWORK],
  coinPath: Config.BTC_COINPATH
};

export const BTCNodeRequest = async (body) => {
  return fetch(
    config.endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': Config.BTC_NODE_AUTH_HEADER
      },
      body: JSON.stringify({
        ...body,
        id: 'hoard-mobile-app'
      })
    }
  );
};



export default class BtcWallet {
  constructor(isMnemonic, initializer) {
    if (isMnemonic) {
      this._wallet = Bitcoin.HDNode.fromSeedBuffer(bip39.mnemonicToSeed(initializer), config.network);
    } else {
      this._wallet = Bitcoin.HDNode.fromBase58(initializer, config.network);
    }

    this._initialDataRequest = this._initializeWallet();
  }

  symbol = SYMBOL_BTC;

  _transactions = []
  _derivationPath = `m/44'/${config.coinPath}'/0'/0/0`;

  _initializeWallet = async () => {
    try {
      const address = await this.getPublicAddress();

      await BTCNodeRequest({
        method: 'importaddress',
        params: [address, address, false]
      });

      const transactionsRequest = BTCNodeRequest({
        method: 'listtransactions',
        params: [address, 10, 0, true]
      });

      const transactionsResponse = await transactionsRequest;
      const transactions = await transactionsResponse.json();
      this._transactions = transactions.result;
    } catch (e) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('error in btc wallet initialization', e);
      }
      this._transactions = [];
    }
  };


  _getPreviousTransaction = () => {
    const previousTransaction = this._transactions[this._transactions.length - 1];

    if (previousTransaction) {
      return previousTransaction;
    }

    return null;
  }

  _broadcastTransaction = async (builtTransaction) => {
    const response = await BTCNodeRequest({
      method: 'sendrawtransaction',
      params: [builtTransaction]
    });

    return response;
  }

  _estimateFee = async () => {
    const request = await BTCNodeRequest({
      method: 'estimatesmartfee',
      params: [2]
    });

    const response = await request.json();

    return Number(response.result.feerate);
  }

  getBalance = async () => {
    await this._initialDataRequest;

    try {
      const address = await this.getPublicAddress();
      const unspentRequest = BTCNodeRequest({
        method: 'listunspent',
        params: [1, 9999999, [address]]
      });
      const unspentResponse = await unspentRequest;
      const unspent = await unspentResponse.json();
      console.log(unspent.result);
      return unspent.result.reduce(
        (total, tx) => total + tx.amount,
        0
      );
    } catch (e) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.log('error in btc balance fetching', e);
      }
      return 0;
    }

  };

  getPublicAddress = async () => {
    return this._wallet.derivePath(this._derivationPath).getAddress();
  };

  getPrivateKey = async () => {
    return this._wallet.toBase58();
  };

  send = async (amount, toAddress) => {
    await this._initialDataRequest;

    const amountSatoshis = amount * 1e8;
    const previousTransaction = this._getPreviousTransaction();

    const tx = new Bitcoin.TransactionBuilder(config.network);

    const balance = await this.getBalance();
    const balanceSatoshis = balance * 1e8;

    const feePerKilobyte = await this._estimateFee();
    const feeSatoshisPerKilobyte = feePerKilobyte * 1e8;
    const address = await this.getPublicAddress();

    const transactionSize = (180 + (2 * 34) + 10 + 1);

    const fee = feeSatoshisPerKilobyte * Math.ceil(transactionSize / 1024);

    const change = parseInt(balanceSatoshis) - parseInt(fee) - parseInt(amountSatoshis);

    tx.addInput(previousTransaction.txid, previousTransaction.vout);
    tx.addOutput(address, change);

    tx.addOutput(toAddress, amountSatoshis);

    tx.sign(0, this._wallet.derivePath(this._derivationPath).keyPair);

    const builtTransaction = tx.build().toHex();

    const response = await this._broadcastTransaction(builtTransaction);

    return response;
  };
}
