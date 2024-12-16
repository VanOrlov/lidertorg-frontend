<template>
    <div class="main-cart container">
        <section class="cart-top-block">
            <h1 class="h1">Корзина</h1>
        </section>
        <section class="cart-main-block">
            <AsideCartItem v-for="product in cart" :key="product.id" :product="product"/>
        </section>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/stores/store';

const cartStore = store();
const cart = computed(() => cartStore.totalCart)
useHead({
    title: 'Корзина | "ЛидерТорг"',

})
</script>

<style scoped>

</style>