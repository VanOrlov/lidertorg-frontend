<template>
        <section class="catalog-hero container">
          <h1>Каталог</h1>
          <div v-if="loadingCategory" class="loading-container">
            Загрузка
          </div>
          <div v-else class="category-items-container">
            <div v-for="category in categoryList" :key="category.id" class="category-item">
              <NuxtLink class="category-link" :to="'/category/' + category.slug">
                <img :src="'http://localhost:1337' + category.image.url" alt="">
                <span class="category-name">{{ category.name }}</span>
              </NuxtLink>
            </div>
          </div>
        </section>
</template>

<script setup lang="ts">
/* Импорты */
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue'


import axios from '@/utils/axios'
/* --- */

/* Типы */
type description = {
    text: string,
    type: string
}

type Category = {
    id: number,
    name: string,
    description?: description[],
    image: {url: string},
    slug: string
}
/* --- */

/* Переменные */
const categoryList: Ref<Category[]> = ref([])
const loadingCategory: Ref<boolean> = ref(true)
/* --- */

/* Функции */
const fetchCategories = async () => {
  try {
    await axios.get('/kategoriyas',{
      params:{
        'filters[parent][$null]': true,
        'populate': "*"
      },
    })
    .then((data)=>{
      categoryList.value = data.data.data
      loadingCategory.value = false
    })
  } catch (error) {
    console.log(error);
    
  }
};
/* --- */

/* Остальное */

fetchCategories()

/* --- */
</script>

<style scoped>
.catalog-hero{
  padding: 50px 0 0 0;
  h1{
    font-size: 48px;
    margin: 10px 0;
  }
}
.category-items-container{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.category-item{
  transition: all .2s ease;
  border: 1px solid #ececec;
  img{
    width: 200px;
    height: 200px;
  }
}
.category-link{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
  width: 100%;
  height: 100%;
}
.category-name{
  font-weight: 700;
  font-size: 20px;
  margin-top: 10px;
  transition: all .2s ease;
  color: black;
}
.category-item:hover{
  box-shadow: 0 10px 20px #0001;
  border-color: #f5f5f5;
  cursor: pointer;
  .category-name{
    color: teal;
    transform: scale(105%);
  }
}
.loading-container{
  width: 100%;
  height: 400px;
  background: #0001;
  transition: all .2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}
</style>