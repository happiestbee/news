<script lang="ts">
    import { onMount } from 'svelte';
    import { MapLibre, Marker, Popup } from 'svelte-maplibre';

    // import type { PageData } from './$types';
    
    // export let data: PageData;
    let loading = true;
    let stories: any;
    // let locations: any;
    // let testPrompt = "Location: Baltimore, Maryland, United States, Latitude: 39.307503, Longitude: -76.606455";

    const location_parse = (output : string) => {
        if (output == '') {
            return {
                lng: 0, 
                lat: 0
            }
        }
        let arr = output.split(", ")
        let obj = {
        lng: Number(arr[arr.length-1].split(": ")[1]),
        lat: Number(arr[arr.length-2].split(": ")[1])
        };
        console.log(obj, output)
        if (isNaN(obj.lng)) {
            obj.lng = 0
        }
        if (isNaN(obj.lat)) {
            obj.lat = 0
        }

        return obj
    }
    /*
    onMount( async () => {
        locations = await fetch(`/api/location`).then((res) => res.json());
        if (await locations) {
            console.log(locations)
            loading = false;
        }
    })
    */

    onMount ( async () => {
        stories = await fetch('/api/stories').then((res) => res.json());
        if (await stories) {
            console.log(stories)
            loading = false;
        }
    })

    

</script>

<div class="map h-full w-full">
    <MapLibre 
    center={[50,20]}
    zoom={1}
    standardControls
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json">
        {#if !(loading)}
            {#each stories as article }
                    <Marker
                        lngLat={location_parse(article.location)}
                        on:click={() => {
                            window.open(article.url)
                        }}
                        class="w-8 h-8 bg-red-300 text-black rounded-full"
                    >
                    <span></span>
                    <Popup openOn="hover" offset={[0, -10]}>
                        <div class="text-lg font-bold text-black">{article.title}</div>
                    </Popup>
                    </Marker>
            {/each}
        {/if}
    </MapLibre>
</div>



