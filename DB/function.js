require('dotenv').config()
const DB = require('./Wallet.js')
const db = new DB()

class Wallet {
    create = async (first) => {
        const res = await db.wallet(first)
        return res
    }

    get = async (filter, matches) => {
        const res = await db.wallet(filter, matches)
        if (res[0] !== undefined){
            return res
        } else {
            return  false
        }
    }

    set = async (filter, updater) => {
        const res = await db.wallet(filter, updater)
        return res
    }
}

const wallet = new Wallet()
module.exports = {
    wallet: wallet
};


