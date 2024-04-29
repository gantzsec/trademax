<script>
    import Header from "../../components/Header.svelte";
    import Footer from "../../components/Footer.svelte";

    import { createEventDispatcher } from 'svelte';

    let productName = '';
    let productPrice = '';

    const dispatch = createEventDispatcher();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send POST request to backend server
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Bezeichnung: productName, Preis: productPrice })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Product added successfully:', data);
            // Dispatch custom event to notify parent component
            dispatch('productAdded', data.productId);
        } else {
            console.error('Failed to add product:', response.statusText);
            // Handle error
        }
    };
</script>

<Header />
<form on:submit={handleSubmit} class="container max-w-screen-lg mx-auto mt-20">
    <h2 class="font-semibold text-xl text-gray-600">Füge ein neues Produkt dem Sortiment hinzu</h2>

    <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="lg:col-span-2">
                <div class="md:col-span-3">
                    <h2 class="text-xl pr-3 text-gray-600">Bezeichnung:</h2>
                    <input class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="text" bind:value={productName} required />
                </div>

                <div class="md:col-span-3">
                    <h2 class="text-xl pr-3 text-gray-600">Preis:</h2>
                    <input class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" type="number" step="0.01" bind:value={productPrice} required />                            </div>
                </div>
            </div>
        </div>

    <div class="md:col-span-5 text-right">
        <div class="inline-flex items-end">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
    </div>
</form>
<Footer />