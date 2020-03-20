const{Blockchain, transactions}= require('./blockchain')

let siuyukCoin=new Blockchain();


siuyukCoin.createTransaction(new transactions('address1','address2',100));
siuyukCoin.createTransaction(new transactions('address2','address1',50));

console.log('\n Starting the miner...');
siuyukCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is: ', siuyukCoin.getBalanceOfAddress('xaviers-address'))
console.log('\n Starting the miner again...');
siuyukCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is: ', siuyukCoin.getBalanceOfAddress('xaviers-address'))



