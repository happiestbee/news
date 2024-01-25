<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';

    let articles: any;
    let loading = true;

    onMount(async () => {
		// let params = new URLSearchParams();
		// params.append('text', 'Multiple tornado warnings were issued for parts of New York on Sunday night.The first warning, which expired at 9 p.m., covered the Bronx, Yonkers and New Rochelle. More than 2 million people live in the impacted area');

		// locations = await fetch(`/api/location?` + params.toString()).then((res) => res.text());
        /*
         await fetch(`/api/location`).then((res) => {
            locations = res.text()
            console.log("djwaiodaw", locations)
            loading = false;
        });		
        */

        articles = await fetch(`/api/stories`).then((res) => res.json());
        if (await articles) {
            loading = false;
        }
	});
    
</script>

<div class="container m-auto my-[5%] flex flex-col space-y-10">
{#if !(loading)}

    {#each articles as article }
    <div class="card">
    <header>
        <img src={article.urlToImage} class="bg-black/50 w-full" alt={article.title} />
    </header>
    <div class="p-4 space-y-4">
        <h6 class="h6" data-toc-ignore>{article.title}</h6>
        <article>
            <p>
               <b>Description: </b>{article.description}
               <br><br>
               <b>Preview: </b>{article.content}
               <br><br>
               <b>Locations: </b>{article.location}
            </p>
        </article>
    </div>
    <footer class="p-4 justify-start">
        <a href={article.url}>Read more</a>
    </footer>
    </div>
    {/each}
{:else}
    loading
{/if}
</div>