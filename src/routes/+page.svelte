<script>
	import { v4 as uuidv4 } from 'uuid';
	import { extractColors } from '$lib/extractColors';
	import '@fontsource/dekko';

	async function getColors() {
		// return ['#90bcb6', '#c9d9e5', '#099094', '#b33a54', '#1e2823', '#649e9a', '#396056'];
		const response = await fetch('/api/colors');
		const pixels = await response.json();
		return extractColors(pixels.pixData);
	}

	let darkMode = false;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<div class="dotted-background">
	<img
		src={darkMode ? 'moon.svg' : 'sun.svg'}
		alt="light"
		width="80"
		height="80"
		class="checkbox absolute top-0 right-0"
		on:click={handleSwitchDarkMode}
	/>
	<div class="flex justify-center pb-2 pt-4">
		<img src="images/dh.png" id="main-image" alt="dh" />
	</div>
	{#await getColors()}
		<div class="flex justify-center mt-20 text-black dark:text-white">...coming</div>
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
		background-image: radial-gradient(circle, #555 1px, transparent 1px);
		background-size: 15px 15px; /* Adjust the spacing between dots */
		@apply bg-white dark:bg-[#111];
	}
	.color-tooltip {
		font-family: 'Dekko', cursive;
		@apply relative w-auto -top-12 left-1/2 -translate-x-1/2
			min-w-max scale-0 text-2xl text-black dark:text-white;
	}
	.checkbox {
		cursor: pointer;
		user-select: none;
	}
</style>
