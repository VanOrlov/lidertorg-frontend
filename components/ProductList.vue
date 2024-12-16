<template>
    <div class="product-list">
        <template v-if="tovar.length > 0">
            <template v-for="product in tovar" :key="product.id">
                <ProductItem :product="product"/>
            </template>
        </template>
        <div v-else>
            Товаров не найдено
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import axios from '@/utils/axios';

import type { Product } from "@/types/types" 

const props = defineProps({
    id: {
        type: Number,
        required: true,
        default: -1,
    },
});

const tovar = ref<Product[]>([]);

const fetchProductsRecursive = async (categoryId: number): Promise<Product[]> => {
    try {
        const allProducts: Product[] = [];
        const response = await axios.get('/kategoriyas', {
            params: {
                'filters[id][$eq]': categoryId,
                'populate': {
                    'tovaries': { 
                        'populate': '*'  
                    },
                    'childrens': {  
                        'populate': '*'  
                    }
                }
            }
        });

        const categoryData = response.data.data[0]; 

        if (categoryData.tovaries) {
            allProducts.push(...categoryData.tovaries);
        }
        if (categoryData.childrens.length > 0) {
            for (const childCategory of categoryData.childrens) {
                const childCategoryId = childCategory.id;
                const childProducts = await fetchProductsRecursive(childCategoryId);
                allProducts.push(...childProducts);  
            }
        }
        tovar.value = allProducts;
        return allProducts; 
    } catch (error) {
        return [];
    }
};


watch(
    () => props.id,
    (newId) => {
        if (newId !== -1) {
            fetchProductsRecursive(newId); 
        }
    }
);

const emit = defineEmits(['updateCount']);
watch(
  () => tovar.value.length,
  (newCount) => {
    emit('updateCount', newCount); // Передаем новое количество товаров родителю
  }
);
</script>

<style scoped>
.product-list{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    width: 80%;
}
</style>