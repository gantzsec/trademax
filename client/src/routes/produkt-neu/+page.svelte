<script>
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

<div class="flex flex-col items-center mt-20">
    <form on:submit={handleSubmit} class="flex flex-col gap-4">
        <label>
            <span class="text-2xl pr-3">Bezeichnung:</span>
            <input class="rounded border-2 border-black float-right" type="text" bind:value={productName} required />
        </label>
        <label>
            <span class="text-2xl pr-3">Preis:</span>
            <input class="rounded border-2 border-black float-right" type="number" step="0.01" bind:value={productPrice} required />
        </label>
        <button class="rounded border-2 border-black" type="submit">Add Product</button>
    </form>
</div>