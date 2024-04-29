<script lang="ts">
    import { onMount } from 'svelte';

    import W87 from "$lib/images/w-87.jpg";
    import Drone from "$lib/images/drone.jpg";
    import Iphone from "$lib/images/iphone.png";

    let products = [];

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data'); // Update URL to match your backend server
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            products = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
</script>

<main class="p-20">
    <!-- statische Daten -->
    <section id="produkte">
        <h2 class="text-3xl py-5">Unsere Produkte</h2>
        <hr>

        <div class="pt-5 flex flex-row flex-wrap gap-10 justify-center [&>div]:rounded">
            {#each products as product}
                <div class="w-1/4 flex flex-col items-center shadow-xl p-5 [&>*]:py-4">
                    <h3 class="text-center text-xl font-bold">{product.Bezeichnung}</h3>
                    <div class="mt-auto flex flex-col items-center">
                        <p class="font-bold mb-3">{product.Preis}€</p>
                        <button class="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
                            Kaufen
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</main>