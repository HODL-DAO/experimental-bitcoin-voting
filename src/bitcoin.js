'use strict'

const SEND_RPC = "https://api.mattercloud.net";
const BALANCE_CHECK_RPC = "https://api.whatsonchain.com";
const SATS_PER_BYTE = 0.75;

export let wallet;

export let loadWallet = async function() {
    wallet = { address: "", privateKey: "" }

    let wif = localStorage.getItem('privKey');

    if (wif) {
        wallet.privateKey = bsv.PrivateKey.fromWIF(wif);
    }

    if (!wallet.privateKey) {
        wallet.privateKey = bsv.PrivateKey.fromRandom();
        localStorage.setItem('privKey', wallet.privateKey.toString());
    }

    console.log(bsv);

    wallet.address = bsv.Address.fromPrivateKey(wallet.privateKey);

    return wallet;
}

export let createQuery = async function(content, limit) {
    let query = {
        "v": 3,
        "q": {
            "find": {"out.s2": content},
            "limit": limit
        }
    };

    return query;
}

export let queryBitcoin = async function(query) {
    let queryContent;

    await fetch("https://txo.bitbus.network/block", {
        method: "post",
        headers: { 
            'Content-type': 'application/json; charset=utf-8', 
            'format': 'json',
            'token': 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxQXVXYU1tUGJQdm5SRTJhaHZNM29UbjhKRmJtVmRHM3ZyIiwiaXNzdWVyIjoiZ2VuZXJpYy1iaXRhdXRoIn0.SDBra1F5ZTV0VmFLUFVSOHlUWGZpRlZDQTViMVM1Wm1zSU52VThwSHN5TkVSOXc1TFVNTGRXd1NveUlLUVZzMktQRHVTZlUxL1RnVjZVeStGMjI2RFJzPQ'
        },
        body: JSON.stringify(query)
    }).then(async (res) => {
        let body = await res.json();
        queryContent = body;
    });

    return queryContent;
}

export let checkBalance = async function(address) {
    let balance = 0;

    await fetch(BALANCE_CHECK_RPC + "/v1/bsv/main/address/" + address + "/balance").then(function(r) {
        return r.json();
    }).then(function(r) {
        balance = r.confirmed + r.unconfirmed;
    });

    return balance;
}

export let createValueTransaction = async function(toAddress, value, privKey) {
    const config = {
		safe: true,
		pay: {
			key: privKey,
			rpc: SEND_RPC,
			feeb: SATS_PER_BYTE,
			to: [{
				address: toAddress,
				value: value
			}]
		}
    }
    
    const buildTx = await new Promise((transaction) => {
        datapay.build(config, function(error, tx) {
            transaction(tx);
        });
    }).then((res) => {
        return res;
    });

    return buildTx;
}

export let createDataTransaction = async function(txData, privKey) {
    const config = {
		safe: true,
		data: txData,
		pay: {
			key: privKey,
			rpc: SEND_RPC,
			feeb: SATS_PER_BYTE
		}
    }

    const buildTx = await new Promise((transaction) => {
        datapay.build(config, function(error, tx) {
            transaction(tx);
        });
    }).then((res) => {
        return res;
    });

    return buildTx;
}

export let createProxyTransaction = async function(txData, privKey) {
    const payment = await proxypay({
        key: privKey,
        outputs: [
            { data: txData }
        ]
    });

    return { address: payment.address, amount: payment.requiredSatoshis, bip21URI: payment.bip21URI }
}

async function init() {
    wallet = await loadWallet();
}

init();