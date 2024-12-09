//TODO: Вынести функцию в отдельный файл + добавить типизарование товара



<template>
    <div class="product-list">
        <template v-for="product in tovar">
            <ProductItem :product="product"/>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

import axios from '@/utils/axios';


const props = defineProps({
    id: {
        type: Number,
        required: true,
        default: -1,
    },
});

const tovar = ref<any[]>([]);

const fetchProductsRecursive = async (categoryId: number) => {
    try {
        // Массив для хранения всех товаров
        let allProducts: any[] = [];

        // Получаем категорию с товарами и дочерними категориями
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
        console.error('Ошибка при загрузке данных:', error);
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