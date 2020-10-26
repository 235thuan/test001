let date = new Date(Date.now()).toLocaleString();
let walletService = require('../service/walletService');
const axios = require('axios');
exports.createWallet = async function (req, res) {
    //get token Mmemonic
    let token;
        axios.get('https://api.isavewallet.org/ETH/GetMNemonic')
            .then(function (response) {
                console.log(response);
                token = response.token;
            })

    // {
    //     "key": "d559cac9-504a-4158-a057-d120f8d74f92",
    //     "mmemomic": "barrel used toilet grape captain author orphan there verify expand liquid since",
    //     "address": "",
    //     "privateKey": "",
    //     "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYmFycmVsIHVzZWQgdG9pbGV0IGdyYXBlIGNhcHRhaW4gYXV0aG9yIG9ycGhhbiB0aGVyZSB2ZXJpZnkgZXhwYW5kIGxpcXVpZCBzaW5jZSIsIk5tZW1vbmljSGVyZSJdLCJqdGkiOiJkMTM0YWUwNC0wMmU0LTQyNzUtOWEyNi0xMGY2NDBlMDZjYTkiLCJleHAiOjE2MDM0NTE5NDEsImlzcyI6ImFzaHByb2doZWxwLmNvbSIsImF1ZCI6ImFzaHByb2doZWxwLmNvbSJ9.mikvAy4UHIWURLMh0RMHNnZy4ha_VLoFwz8VUKx8gv4"
    // }
    let address;
    //get address Mmemonic
    axios.get('https://api.isavewallet.org//ETH/AuthenNmemonic')
        .then(function (response) {
            console.log(response);
            address=response.address;
        })

    // {
    //     "key": null,
    //     "mmemomic": "barrel used toilet grape captain author orphan there verify expand liquid since",
    //     "address": "0x751048A12df3B44B9F27b8f02DCaA54907E5d3b5",
    //     "privateKey": "",
    //     "jwt": null
    // }

    //Save in DATABASE

    let jsonSend = {
        api: "/api/createWallet",
        date: date,
        message: null,
        error: null,
        requestResult: false,
        result: {},
    }
    try {

        jsonSend.result = await walletService.createWallet(Users.userId);
        jsonSend.message='Success Create Wallet';
        jsonSend.requestResult= true;
        res.send(jsonSend);
    } catch (err) {
        jsonSend.error = err.message;
        res.status(400).send(jsonSend);
    }
}

exports.updateWallet = async function (req, res) {
    let errors = [];
    let jsonSend = {
        api: "/api/updateWallet",
        date: date,
        message: null,
        error: null,
        requestResult: false,
        result: [],
    }
    try {
        let Contents = {
            getId: req.body.userId ? req.body.userId : '',
            content: req.body.content ? req.body.content : '',
            title: req.body.title ? req.body.title : '',
            pushId: req.body.pushId ? req.body.pushId : '',
            type: req.body.type ? req.body.type : '',
        }
        let sendNotice = await walletService.sendNotification(Contents.getId,
            Contents.content,
            Contents.pushId,
            Contents.type,
            Contents.title);
        jsonSend.message = 'send new notification';
        jsonSend.requestResult = true;
        if (!req.body.title) {
            errors.push('Title is required !');
        }
        if (!req.body.userId) {
            errors.push('User Id is required !');
        }
        if (!req.body.content) {
            errors.push('Content is required !');
        }
        if (errors.length) {
            res.send(jsonSend, {errors: errors});
        }
        jsonSend.result = sendNotice;
        res.send(jsonSend);

    } catch (err) {
        jsonSend.error = err.message;
        jsonSend.message = errors;
        res.status(400).send(jsonSend);
    }
}



