<template>
    <aside class="catalog-sidebar">
        <div class="sidebar-categories-container">
            <div class="parent-container" v-if="categories.length !== 0" v-for="category in categories" :id="String(category.id)" @mouseover="showMenu(category.id)" @mouseleave="hideMenu">
                <NuxtLink :to="'/category/' + category.slug" class="parent-category">
                    <span>{{ category.name }}</span>
                    <span v-if="category.childrens.length !== 0" class="aside-item-arrow">></span>
                </NuxtLink>
                <div v-if="category.childrens.length !== 0" class="category-child-right-dropdown" :id="String(category.id)" :class="{ visible: activeMenu === category.id }">
                    <NuxtLink :to="'/category/' + child.slug" v-for="child in category.childrens" class="category-child-item">
                        <NuxtImg :src="'http://localhost:1337/' + child.image?.url"/>
                        <span class="name">{{ child.name }}</span>
                    </NuxtLink>
                </div>
            </div>
            <div v-else class="parent-container">
                <span class="skeleton-breadcrumb skeleton"></span>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';

import axios from '@/utils/axios';

type Category = {
    id: number;
    name: string,
    slug: string,
    childrens: Array<{
        id: number;
        name: string;
        slug: string;
        image?: { url: string }; // Добавьте свойства изображения, если они присутствуют
    }> | [];
}

const activeMenu: Ref<number | null> = ref(-1);

const showMenu = (id: number) => {
  activeMenu.value = id; // Активируем меню с этим ID
};
const hideMenu = () => {
  activeMenu.value = null; // Деактивируем меню
};

const categories: Ref<Category[]> = ref([])
const asideCategories = async () => {
    try {
        await axios.get('/kategoriyas', {
            params: {
                'filters[parent][$null]': true,
                'populate': {
                    childrens:{
                        'populate': '*'
                    }
                },
            }
        })
        .then((data) => {
            categories.value = data.data.data
            console.log(categories.value);
            
        })
    } catch (error) {
        console.error(error)
    }
}

asideCategories()

</script>

<style scoped>
.catalog-sidebar{
    width: 20%;
    padding-right: 20px;
    .sidebar-categories-container{
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        .parent-container{
            padding: 10px 20px;
            border: 1px solid #f5f5f5;
            position: relative;
            .parent-category{
                display: flex;
                justify-content: space-between;
                width: 100%;
                font-size: 14px;
                .aside-item-arrow{
                    margin-left: auto;
                }
            }
            .category-child-right-dropdown{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap: 50px;
                position: absolute;
                padding: 20px;
                left: 100%;
                top: 0;
                box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
                z-index: 2;
                opacity: 0;
                visibility: hidden;
                background: white;
                transition: opacity .2s ease;
                .category-child-item{
                    display: flex;
                    img{
                        max-height: 60px;
                        border-radius: 5px;
                    }
                    span{
                        margin-left: 20px;
                        font-weight: 600;
                        transition: all .2s ease;
                    }
                }
                .category-child-item:hover{
                    span{
                        color: teal;
                    }
                }
            }
            .visible{
                visibility: visible;
                opacity: 1;
            }
        }
        .parent-container:not(:last-child){
            border-bottom: 0px;
        }
        .parent-container:hover{
            background: #f5f5f5;
        }
    }
}
</style>