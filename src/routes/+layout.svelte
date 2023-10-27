<script lang="ts">
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';

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
		<a href="#features"><h1>Features</h1></a>
		<a href="#contact"><h1>Contact</h1></a>
	</svelte:fragment>
</AppBar>
<div class="m-[8%]">
<slot />
</div>

