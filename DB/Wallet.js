const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wallet', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Database connected successfully !')
}).catch((err) => {
    console.log('Error connecting with error code:', err);
})

const Schema = mongoose.Schema

const schemaWallet = new Schema({
    userId: {type: String, default: null},
    idWallet: {type: String, default: null},
    typeWallet: {type: String, default: null},
    address: {type: String, default: null},
    inserted: {type: Number, default: Date.now},
    updated: {type: Number, default: Date.now},
    }
)

const Wallet = mongoose.model('Wallet', schemaWallet, 'wallets')


//
class DB {
    constructor() {
        this.Wallet = Wallet
    }

    wallet = async (filter, updater) => {
        if (typeof updater === 'object') {
            return await this.Wallet.findOneAndUpdate(filter, updater, {new: true})
        }
        if (typeof updater === 'string') {
            if (updater === '') {
                return await this.Wallet.find(filter)
            } else {
                return await this.Wallet.find(filter, updater)
            }
        }
        if (typeof updater === 'undefined') {
            const doc = new this.Wallet(filter)
            return await doc.save()
        }
    }
}

module.exports = DB
