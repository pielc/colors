<script>
	import { v4 as uuidv4 } from 'uuid';
	import { extractColors } from '$lib/extractColors';
	import '@fontsource/dekko';

	async function getColors() {
		// return ['#89b9b3', '#cee1ed', '#649d99', '#099094', '#1e2823', '#396056', '#b33954', '#bbcad3'];
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
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div class="w-[60px] sm:w-[60px] lg:w-[80px] absolute top-0 right-0">
		<img
			src={darkMode ? 'moon.svg' : 'sun.svg'}
			alt="light"
			class="checkbox"
			on:click={handleSwitchDarkMode}
		/>
	</div>
	<div class="flex justify-center pt-28 sm:pt-20 px-10 sm:px-20">
		<img src="images/dh.png" id="main-image" alt="dh" />
	</div>
	{#await getColors()}
		<div class="flex justify-center mt-20 text-black dark:text-white h-[50px]">
			<img class="rotating dark:invert" src="hourglass.svg" alt="...coming" />
		</div>
	{:then colors}
		<div class="flex justify-center mt-20">
			<div class="grid grid-cols-4 md:grid-cols-8 gap-2">
				{#each colors as color (uuidv4())}
					<div
						class="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[80px] md:h-[80px] mx-1 group"
						style="background: {color}"
					>
						<div class="color-tooltip group-hover:scale-100">
							{color}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>

<style>
	.dotted-background {
		height: 100vh;
		background-image: radial-gradient(circle, #777 1px, transparent 1px);
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

	.rotating {
		animation: rotation 3s ease-in-out infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(180deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
