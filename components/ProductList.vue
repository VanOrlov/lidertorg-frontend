<template>
    <div class="product-list">
        
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import axios from '@/utils/axios';

const fetchProducts = async (categoryId: number): Promise<void> => {
    try {
        const response = await axios.get('/kategoriyas', {
            params: {
                'filters[id][$eq]': categoryId
            },
        })
        console.log(response.data.data);
        
        
    } catch (error) {
        
    }
}
fetchProducts(28)
</script>

<style scoped>
.product-list{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    width: 80%;
    height: 100px;
    background: red;
}
</style>