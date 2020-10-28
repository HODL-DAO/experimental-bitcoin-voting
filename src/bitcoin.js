const SEND_RPC = "https://api.mattercloud.net";
const BALANCE_CHECK_RPC = "https://api.whatsonchain.com";

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

export let createDataTransaction = function(data, privateKey) {
    let config = {
        safe: true,
        data: data,
        pay: {
            key: privateKey,
            rpc: SEND_RPC,
            feeb: 70
        }
    }

    datapay.send(config);
}