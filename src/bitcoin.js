'use strict'

import * as bsv from "bsv";

const SEND_RPC = "https://api.mattercloud.net";
const BALANCE_CHECK_RPC = "https://api.whatsonchain.com";

export let wallet;

export let loadWallet = async function() {
    wallet = { address: "", privateKey: "" }

    let wif = localStorage.getItem('privKey');

    console.log(bsv.PrivKey);

    if (wif) {
        wallet.privateKey = bsv.PrivKey.fromWif(wif);
    }

    if (!wallet.privateKey) {
        wallet.privateKey = bsv.PrivKey.fromRandom();
        localStorage.setItem('privKey', wallet.privateKey.toString());
    }

    console.log(bsv);

    wallet.address = bsv.Address.fromPrivKey(wallet.privateKey);

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
        console.log(balance);
    });

    return balance;
}

async function init() {
    wallet = await loadWallet();
}

init();