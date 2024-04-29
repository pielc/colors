<script>
	import { v4 as uuidv4 } from 'uuid';
	import { extractColors } from '$lib/extractColors';
	import '@fontsource/dekko';

	async function getColors() {
		const response = await fetch('/api/colors');
		const pixels = await response.json();
		return extractColors(pixels.pixData);
	}
</script>

<div class="dotted-background">
	<div class="flex justify-center pb-2 pt-4">
		<img src="images/dh.png" id="main-image" alt="dh" />
	</div>
	{#await getColors()}
		<div class="flex justify-center mt-20">...coming</div>
	{:then colors}
		<div class="flex justify-center mt-20">
			{#each colors as color (uuidv4())}
				<div class="w-20 h-20 mx-1 group" style="background: {color}">
					<div class="color-tooltip group-hover:scale-100">
						{color}
					</div>
				</div>
			{/each}
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.dotted-background {
		height: 100vh;
		background-image: radial-gradient(circle, #333 1px, transparent 1px);
		background-size: 15px 15px; /* Adjust the spacing between dots */
		background-color: #fff; /* Adjust the background color */
	}
	.color-tooltip {
		font-family: 'Dekko', cursive;
		@apply relative w-auto -top-12  left-1/2 -translate-x-1/2 min-w-max scale-0 text-2xl;
	}
</style>
