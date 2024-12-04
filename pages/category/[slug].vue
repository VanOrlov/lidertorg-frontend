<template>
    <section class="page-top container">
        <div class="h1-container">
            <h1 class="h1">Какая то категория</h1>
            <span class="products-count">24</span>
        </div>
        <div class="breadcrumbs-container">
            <template v-for="breadcrumb in breadCrumbs">
                <p class="breadcrumb-item" v-if="breadcrumb.url">
                    <NuxtLink :to="breadcrumb.url">{{ breadcrumb.name }}</NuxtLink>
                </p>
                <p class="breadcrumb-item" v-else>
                    {{ breadcrumb.name }}
                </p>
            </template>
        </div>
        <div class="category-children">
            <template v-for="child in childrenCategory">
                <NuxtLink class="children-item">
                    <NuxtImg class="child-img" :src="'http://localhost:1337' + child.image.url" />
                </NuxtLink>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

import axios from '@/utils/axios'

type Child = {
    id: number,
    name: string,
    image: {url: string}
}

const route = useRoute();
const slug = route.params.slug


const childrenCategory: Ref<Child[]> = ref([]) 

const breadCrumbs = [
    {
        name: 'Главная',
        url: '/'
    },
    {
        name: 'Каталог',
        url: '/catalog'
    },
    {
        name: 'Электроника',
        url: null
    }
]

const fetchCategory = async () => {
    await axios.get('/kategoriyas', {
        params:{
            'filters[slug][$eq]': slug,
            'populate': {
                childrens:{
                    'populate': 'image'
                }
            },
        }
    })
    .then((data) => {
        childrenCategory.value = data.data.data[0].childrens
        console.log(childrenCategory.value);
    })
}
fetchCategory()
</script>

<style scoped>
.page-top{
    padding: 50px 0;
    .h1-container{
        display: flex;
        align-items: center;
        gap: 10px;
        .h1{
            font-size: 48px;
            margin: 10px 0;
        }
        .products-count{
            padding: 2px 6px;
            border: 1px solid rgba(153, 153, 153, 0.35);
            border-radius: 3px;
            color: #999;
        }
    }
    .breadcrumbs-container{
    display: flex;
    gap: 5px;
    color: #999;
        .breadcrumb-item{
            padding-right: 10px;
            position: relative;
            transition: all .0s ease;
        }
        .breadcrumb-item:not(:last-child):hover{
            color: teal;
        }
        .breadcrumb-item:not(:last-child)::after{
            content: '-';
            position: absolute;
            right: 0;
        }
    }
    .category-children{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-top: 20px;
        .children-item{
            display: flex;
            padding: 28px 34px;
            border: 1px solid #ececec;
            .child-img{
                max-width: 120px;
            }
        }
        .children-item:hover{
            box-shadow: 0 10px 20px #0001;
            border-color: #f5f5f5;
            cursor: pointer;
        }
    }
}


</style>