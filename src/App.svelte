<script>
	import { onMount } from 'svelte';
	import { createQuery, queryBitcoin, checkBalance, createDataTransaction } from './bitcoin';

	let testQuery, results = [], currentBalance;
	let items = [];

	onMount(async () => {
		testQuery = await createQuery("19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut");
		results = await queryBitcoin(testQuery);

		for(let i = 0; i < results.length; i++) {
			let text = results[i].out[0].s3;

			if(text !== undefined) {
				items.push(text);
			}
		}

		// Force DOM to reload.
		items = items;

		currentBalance = await checkBalance("1AcpaEcJACmAEniQ1QfeLEGR986b9Bff5Y");
		console.log(currentBalance);
	});

	$: items;
</script>

<main>
	<h1>Sats: {currentBalance}!</h1>
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