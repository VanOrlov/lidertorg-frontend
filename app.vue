<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { store } from '@/stores/store';

const cartStore = store();

// Загрузка корзины при запуске приложения
onMounted(() => {
  cartStore.loadFromCookie(); // Загружаем данные корзины из cookie

  // Сохраняем корзину в cookie при каждом изменении
  cartStore.$subscribe((mutation, state) => {
    cartStore.saveToCookie();
    
  });
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
/* Обунлящий список */
* {
  padding: 0;
  margin: 0;
  border: 0;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  font-family: Montserrat, Arial, sans-serif;
}

input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}
button {
  cursor: pointer;
}
button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
a,
a:visited {
  text-decoration: none;
  transition: all 0.2s ease;
  color: inherit;
}
a:hover {
  text-decoration: none;
}
ul li {
  list-style: none;
}
img {
  vertical-align: top;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: 400;
}
/* Обунлящий список */

.skeleton {
  display: inline-block;
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}
.skeleton-h1{
    width: 200px;
    height: 48px;
}
.skeleton-breadcrumb{
    width: 150px;
    height: 14px;
}

@keyframes skeleton-loading {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>