<template>
    <div class="">
        <section class="page-top container">
            <div class="h1-container">
                <h1 v-if="thisCategory.name" class="h1">{{ thisCategory.name }}</h1>
                <h1 v-else class="h1 skeleton skeleton-h1" />
                <span v-if="productCount !== 0" class="products-count">{{ productCount }}</span>
            </div>
            <div class="breadcrumbs-container">
                <template v-if="breadCrumbs.length > 0">
                    <template v-for="breadcrumb in breadCrumbs" :key="breadcrumb.name">
                        <p v-if="breadcrumb.url" class="breadcrumb-item">
                            <NuxtLink :to="breadcrumb.url">{{ breadcrumb.name }}</NuxtLink>
                        </p>
                        <p v-else class="breadcrumb-item">
                            {{ breadcrumb.name }}
                        </p>
                    </template>
                </template>
                <p v-else class="skeleton-breadcrumb skeleton" />
            </div>
            <div class="category-children">
                <template v-if="childrenCategory">
                    <template v-for="child in childrenCategory" :key="child.id">
                        <NuxtLink :to="child.slug" class="children-item">
                            <NuxtImg class="child-img" :src="'http://localhost:1337' + child.image.url" />
                            <span class="child-name">{{ child.name }}</span>
                        </NuxtLink>
                    </template>
                </template>
            </div>
        </section>
        <section class="main-catalog container">
            <AsideCatalog />
            <ProductList :id="thisCategory.id" @update-count="updateProductCount" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';

import axios from '@/utils/axios';

import type { Ref } from 'vue';
import type { Category, Child, Breadcrumb } from '@/types/types'

// Параметры маршрута и реактивные переменные
const route = useRoute();
const slug: Ref<string | undefined> = ref(route.params.slug as string);
const thisCategory: Ref<Partial<Category>> = ref({});
const childrenCategory: Ref<Child[]> = ref([]);
const breadCrumbs: Ref<Breadcrumb[]> = ref([]);

// Функция для получения категории по slug
const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
    try {
        const response = await axios.get('/kategoriyas', {
            params: {
                'filters[slug][$eq]': slug,
                'populate': 'parent'
            }
        });

        if (response.data && response.data.data && response.data.data.length > 0) {
            return response.data.data[0];
        } else {
            console.warn('Нет данных для категории с указанным slug:', slug);
            return null;
        }
    } catch (error) {
        console.error('Ошибка при получении данных категории:', error);
        return null;
    }
};

// Функция для получения текущей категории и формирования хлебных крошек
const fetchCategory = async () => {
    try {
        const response = await axios.get('/kategoriyas', {
            params: {
                'filters[slug][$eq]': slug.value,
                'populate': {
                    childrens: {
                        'populate': 'image'
                    },
                    parent: true // Загружаем родителя текущей категории
                }
            }
        });

        if (response.data.data.length > 0) {
            // Установка текущей категории и детей
            thisCategory.value = response.data.data[0];
            childrenCategory.value = response.data.data[0].childrens;

            // Очищаем хлебные крошки и добавляем базовые
            breadCrumbs.value = [
                {
                    name: 'Главная',
                    url: '/'
                },
                {
                    name: 'Каталог',
                    url: '/catalog'
                }
            ];

            // Строим хлебные крошки от текущей категории к корневой
            await buildBreadCrumbs(response.data.data[0]);
        } else {
            console.warn('Нет данных');
        }
    } catch (error) {
        console.error(error);
    }
};

// Рекурсивная функция для формирования хлебных крошек
const buildBreadCrumbs = async (category: Category | null) => {
    if (category) {
        // Если есть родительская категория, сначала добавляем её
        if (category.parent) {
            const parentCategory = await fetchCategoryBySlug(category.parent.slug);
            await buildBreadCrumbs(parentCategory);
        }

        // Добавляем текущую категорию в хлебные крошки
        breadCrumbs.value.push({
            name: category.name,
            url: `/category/${category.slug}`
        });
    }
};

const productCount = ref(0);
const updateProductCount = (count: number) => {
  productCount.value = count; 
};

// Загружаем данные при монтировании компонента
onMounted(async () => {
    await fetchCategory();
    breadCrumbs.value[breadCrumbs.value.length - 1].url = null
    useHead({
        title: `${thisCategory.value.name} купить в Ярославле | "Лидерторг"`,
    })
});

// Следим за изменениями slug и обновляем данные при изменении маршрута
watch(
    () => route.params.slug,
    async (newSlug) => {
        
        slug.value = newSlug as string;
        await fetchCategory();
    }
);
</script>

<style scoped>
.page-top {
    padding: 50px 20px;

    .h1-container {
        display: flex;
        align-items: center;
        gap: 10px;

        .h1 {
            font-size: 48px;
            margin: 10px 0;
        }

        .products-count {
            padding: 2px 6px;
            border: 1px solid rgba(153, 153, 153, 0.35);
            border-radius: 3px;
            color: #999;
        }
    }
    .breadcrumbs-container {
        display: flex;
        gap: 5px;
        color: #999;

        .breadcrumb-item {
            padding-right: 10px;
            position: relative;
            transition: all .0s ease;
        }

        .breadcrumb-item:not(:last-child):hover {
            color: teal;
        }

        .breadcrumb-item:not(:last-child)::after {
            content: '-';
            position: absolute;
            right: 0;
        }
    }

    .category-children {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-top: 20px;
        gap: 10px;
        .children-item {
            display: flex;
            padding: 28px 34px;
            border: 1px solid #ececec;
            border-radius: 5px;
            .child-img {
                max-width: 120px;
                border-radius: 5px;
            }
            .child-name{
                font-size: 20px;
                font-weight: 700;
                margin-left: 20px;
                transition: all .2s ease;
            }
        }

        .children-item:hover {
            box-shadow: 0 10px 20px #0001;
            border-color: #f5f5f5;
            cursor: pointer;
            .child-name{
                color: teal;
            }
        }
    }
}
.main-catalog{
    display: flex;
    width: 100%;
}
</style>