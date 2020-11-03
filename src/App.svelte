<script>
	import 'bulma/css/bulma.css'
	import { Button } from 'svelma'
	import '@fortawesome/fontawesome-free/css/all.css'
	import { onMount } from 'svelte';

	import Nav from './components/Nav.svelte';
	import { wallet, createQuery, queryBitcoin, checkBalance, createDataTransaction, createProxyTransaction } from './bitcoin';

	let testQuery, results = [], currentBalance;
	let items = [];

	let proxyTransaction = { address: 0, amount: 0 };

	onMount(async () => {
		testQuery = await createQuery("19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut", 1000);
		results = await queryBitcoin(testQuery);

		for(let i = 0; i < results.length; i++) {
			let text = results[i].out[0].s3;

			if(text !== undefined) {
				items.push(text);
			}
		}

		// Force DOM to reload.
		items = items;

		console.log(wallet);

		let someData = ["Data Chunk 1", "Data Chunk 2", "Data Chunk 3", "Data Chunk ..."];

		// Builds a data transaction which can then later be sent.
		createDataTransaction(someData, wallet.privateKey.toString()).then((res) => {
			console.log(res);
		});

		// Builds a data transaction which can be funded by an external wallet.
		createProxyTransaction(someData, wallet.privateKey.toString()).then((res) => {
			proxyTransaction = res;
			console.log(res);
		});

		currentBalance = await checkBalance(wallet.address.toString());
	});
</script>

<main>
	<Nav address={wallet.address.toString()} />
	<Button type="is-primary">I'm a Button!</Button>

	<h1>Balance: {currentBalance} sats!</h1>
	<p><strong>Address:</strong> {wallet.address.toString()}</p>
	<p><strong>Private Key:</strong> {wallet.privateKey.toString()}</p>

	<hr />

	<p>Pay <strong>{proxyTransaction.amount}</strong> to <strong>{proxyTransaction.address}</strong> to send this transaction!</p>

	<hr />

	{#each items as item}
		<p>{item}</p>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>