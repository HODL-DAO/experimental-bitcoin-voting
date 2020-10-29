<script>
	import { onMount } from 'svelte';
	import { wallet, createQuery, queryBitcoin, checkBalance, createDataTransaction } from './bitcoin';

	let testQuery, results = [], currentBalance;
	let items = [];
	let loadedWallet = { address: "", privateKey: "" };

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

		loadedWallet = await wallet();
		console.log(loadedWallet);

		currentBalance = await checkBalance(loadedWallet.address.toString());
	});
</script>

<main>
	<h1>Sats: {currentBalance}!</h1>
	<h2>Address: {loadedWallet.address.toString()}</h2>
	<h3>Private Key: {loadedWallet.privateKey.toString()}</h3>
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