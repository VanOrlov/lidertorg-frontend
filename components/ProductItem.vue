<template>
    <NuxtLink class="product-item">
        <div class="img-container">
            <NuxtImg :src="'http://localhost:1337' + product.main_image.url" />
        </div>
        <div class="item-information">
            <span class="item-name">{{ product.title }}</span>
            <span class="item-price">{{ formatPrice(product.price) }} ₽</span>

        </div>
        <div class="cart-icon" @click="addToCart(product)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z" fill="currentColor"></path></svg>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Product, CartItem } from '@/types/types'
import { store } from '@/stores/store';
const cartStore = store();
const props = defineProps({
    product:{
        type: Object,
        required: true,
    }
})

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

const addToCart = (product: Product) => {
    const obj: CartItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        img: product.main_image.url,
        quantity: 1
    }
    cartStore.addToCart(obj)
    console.log(computed(() => cartStore.totalCart).value);
}

</script>

<style scoped>
.product-item{
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ececec;
    padding: 20px;
    .img-container{
        width: 100%;
        display: flex;
        justify-content: center;
        img{
            width: 100%;
            border-radius: 5px;
        }
    }
    .item-information{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        .item-name{
            font-size: 16px;
            line-height: 125%;
        }
        .item-price{
            margin-top: 30px;
            font-size: 18px;
            font-weight: 600;
        }
    }
    .cart-icon{
        position: absolute;
        padding: 3px;
        border-radius: 5px;
        width: 24px;
        height: 24px;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 128, 128, .1);
        transition: background .2s ease;
    }
    .cart-icon:hover{
        background: rgba(0, 128, 128, .4);
    }
}
.product-item:hover{
    box-shadow: 0 10px 20px #0001;
    border-color: #f5f5f5;
    cursor: pointer;
    .item-name{
        color: teal;
    }
}
</style>