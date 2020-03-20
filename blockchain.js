const SHA256 = require('crypto-js/sha256');

class transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress= fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}

class Block{
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(diffculty){
        while(this.hash.substring(0,diffculty) !== Array(diffculty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }

        console.log("Block mined:" + this.hash);
    }

}



class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.diffculty=2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block("08/03/2020","Siu Yuk","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.diffculty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [
            new transactions(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transactions){
        this.pendingTransactions.push(transactions);
    }

    getBalanceOfAddress(address){
        let balance=0;

        for (const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress===address){
                    balance-=trans.amount;
                }

                if(trans.toAddress===address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousHash=this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousHash.hash){
                return false;
            }
        }

        return true;
    }

}


module.exports.Blockchain = Blockchain;
module.exports.transactions = transactions;