import { createSelector } from 'reselect';

export const allWalletsSelector = createSelector(
  state => state.wallet.walletAddresses,
  state => state.wallet.wallets,
  (addresses, objects) =>
    addresses.map(address => objects[address])
);

export const walletsForSymbolSelector = createSelector(
  allWalletsSelector,
  (_, symbol) => symbol,
  (wallets, symbol) =>
    wallets.filter(wallet => wallet.symbol === symbol)
);

export const walletSelector = createSelector(
  state => state.wallet.wallets,
  (_, address) => address,
  (wallets, address) => wallets[address]
);
