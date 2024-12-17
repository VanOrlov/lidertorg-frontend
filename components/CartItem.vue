<template>
    <div class="cart-item-container">
        <div class="img-container">
            <NuxtImg :src="'http://localhost:1337' + product.img" />
        </div>
        <div class="info-title">
            <span>{{ product.name }}</span>
        </div>
        <div class="management-cart-item">
            <div class="price-one">
                {{ formatPrice(product.price) }} ₽
            </div>
            <div class="buy-block">
                <div class="buy-block-item minus" @click="cartStore.decrementProduct(product.id)" />
                <div class="buy-block-item">{{ product.quantity }}</div>
                <div class="buy-block-item plus" @click="cartStore.incrementProduct(product.id)" />
            </div>
            <div class="price-one">
                <transition-group name="fade" tag="div">
                    {{ formatPrice(product.price * product.quantity) }} ₽
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { store } from '@/stores/store';

import type { CartItem } from '~/types/types';

const cartStore = store();

defineProps<{
    product: CartItem
}>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};
</script>

<style scoped>
.cart-item-container{
    display: flex;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    .img-container{
        max-width: 133px;
        border-radius: 5px;
        overflow: hidden;
    }
    .info-title{
        font-size: 18px;
        margin-left: 20px;
        max-width: 300px;
    }
    .management-cart-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: inherit;
        margin-left: 20px;
        width: 100%;
        .price-one{
            font-size: 18px;
            font-weight: 600;
        }
        .buy-block{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border: 1px solid #eeeeee;
            background: #fafafa;
            border-radius: 5px;
            .buy-block-item{
                position: relative;
                padding: 8px;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .2s ease;
            }
            .buy-block-item:hover{
                background: #e4e4e4;
                cursor: pointer;
            }
        }

    }
}



.minus::after{
    content: '';
    width: 9px;
    height: 1px;
    background-color: #979797;
    margin-top: 1px;
}
.plus::after{
    content: '';
    position: absolute;
    width: 9px;
    height: 1px;
    background-color: #979797;
    margin-top: 1px;
}
.plus::before{
    content: '';
    width: 9px;
    height: 1px;
    background-color: #979797;
    margin-top: 1px;
    transform: rotate(90deg);
}

</style>