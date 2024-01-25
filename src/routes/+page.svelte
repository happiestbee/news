<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	/*
	onMount(() => {
		setInterval(() => {
			fetch('/api/test');
		}, 1000);
	});
	

	async function getStories() {
		let test = await fetch('/api/test')	
	}
	
	onMount( async () => {
		console.log("main")
		setInterval(await getStories, 600000)
	});
	*/

	onMount(() => {
		fetch('/api/test/')
	});
	
</script>
<AppBar background="bg-transparent">
	<svelte:fragment slot="lead">
		<a href="/">
		<h1>
			<span class="text-3xl bg-gradient-to-br from-green-300 to-blue-600 bg-clip-text text-transparent box-decoration-clone">News</span>
		</h1>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a href="news"><h1>News</h1></a>
		<a href="#features"><h1>Features</h1></a>
		<a href="#contact"><h1>Contact</h1></a>
	</svelte:fragment>
	
</AppBar>
<div class="m-[8%]">
<div class="m-auto container mx-auto flex flex-col justify-center items-center space-y-12">
	<div class="flex flex-col container text-center justify-center items-center space-y-8 ">
		<h1 class="text-6xl leading-normal">Introducing the latest <span class="underline decoration-sky-500">innovation</span> <br> in <span class="underline decoration-pink-500">News Briefing</span></h1>
		<div class="max-w-[60%]">
			<p class="text-xl font-light leading-8">This revolutionary news briefing platform compeltely transforms the way that you consume news stories. 
			Combining geolocation with up to date stories from around the world, instead of scrolling through endless headlines, 
			you will be able to browse based on physical location.  
			</p>
		</div>
	</div>
	<a href="#features"><button type="button" class="btn variant-filled">
		<span>Learn More</span>
		<span><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
			<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
		</svg></span>
	</button></a>
	<span id="features" class="relative -bottom-[25vh]"></span>
	<div class="relative -bottom-[40vh] space-y-12">
		<h1 class="text-4xl leading-normal text-center">Features</h1>
		<div class="grid grid-cols-3 gap-x-[5rem] gap-y-[3rem]">
			<div class="card card-hover p-10 items-center">
				<header class="card-header text-xl">Feature 1</header>
				<section class="p-4">To be filled in later...</section>
			</div>
			<div class="card card-hover p-10 items-center">
				<header class="card-header text-xl">Feature 2</header>
				<section class="p-4">To be filled in later...</section>
			</div>
			<div class="card card-hover p-10 items-center">
				<header class="card-header text-xl">Feature 3</header>
				<section class="p-4">To be filled in later...</section>
			</div>
			<div class="card card-hover p-10 items-center">
				<header class="card-header text-xl">Feature 4</header>
				<section class="p-4">To be filled in later...</section>
			</div>
			<div class="card card-hover p-10 items-center">
				<header class="card-header text-xl">Feature 5</header>
				<section class="p-4">To be filled in later...</section>
			</div>
			<div class="card card-hover p-10 items-center">
				<header class="card-header text-xl">Feature 6</header>
				<section class="p-4">To be filled in later...</section>
			</div>
		</div>
	</div>
	<span id="contact" class="relative -bottom-[65vh]"></span>
	<div class="relative -bottom-[80vh] space-y-12">
		<h1 class="text-4xl leading-normal text-center">Contact</h1>
		<div class="card px-80 py-40">
			<section class="p-4">To be filled in later...</section>
		</div>
	</div>
	<span class="relative invisible -bottom-[100vh]">:D</span>
	
</div>
</div>