<script>
	import { onMount } from 'svelte';
	import { wallet, createQuery, queryBitcoin, checkBalance } from './bitcoin';

	let testQuery, results = [], currentBalance;
	let items = [];

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

		currentBalance = await checkBalance(wallet.address.toString());
	});
</script>

<main>
	<h1>Satsss: {currentBalance}!</h1>
	<h2>Address: {wallet.address.toString()}</h2>
	<h3>Private Key: {wallet.privateKey.toString()}</h3>
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