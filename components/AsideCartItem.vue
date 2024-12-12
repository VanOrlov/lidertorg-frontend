<template>
    <div class="cart-item">
        <div class="img-container">
            <NuxtImg :src="'http://localhost:1337' + product.img" />
        </div>
        <div class="main-info">
            <div class="info-title">{{ product.name }}</div>
            <div class="price-info">
                <div class="price">
                    <span>{{ formatPrice(product.price) }} ₽</span>
                </div>
                <div class="buy-block">
                    <div class="buy-block-item minus" @click="cartStore.decrementProduct(product.id)" />
                    <div class="buy-block-item">{{ product.quantity }}</div>
                    <div class="buy-block-item plus" @click="cartStore.incrementProduct(product.id)" />
                </div>
                <div class="total-price-block">
                    {{ formatPrice(product.price * product.quantity) }} ₽
                </div>
            </div>
        </div>
        <div class="delete-button" @click="cartStore.removeFromCart(product.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16"><path data-name="Rounded Rectangle 114 copy 3" fill="lightgray" class="cccls-1" d="M334.411,138l6.3,6.3a1,1,0,0,1,0,1.414,0.992,0.992,0,0,1-1.408,0l-6.3-6.306-6.3,6.306a1,1,0,0,1-1.409-1.414l6.3-6.3-6.293-6.3a1,1,0,0,1,1.409-1.414l6.3,6.3,6.3-6.3A1,1,0,0,1,340.7,131.7Z" transform="translate(-325 -130)"></path></svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { store } from '@/stores/store';

import type { CartItem } from '@/types/types';

const cartStore = store();

defineProps<{
    product: CartItem;
}>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};
</script>

<style scoped>
.cart-item{
    display: flex;
    position: relative;
    padding: 25px;
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    .img-container{
        width: 80px;
        max-height: 80px;
        img{
            width: 100%;
        }
    }
    .main-info{
        width: 100%;
        margin-left: 30px;
        .info-title{
            font-size: 16px;
            margin-bottom: 20px;
        }
        .price-info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price{
                opacity: .6;
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
            .total-price-block{
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
    .delete-button{
            position: absolute;
            top: 10px;
            right: 10px;
            svg{
                path{
                    transition: all .2s ease;
                }
            }
        }
        .delete-button:hover{
            cursor: pointer;
            svg{
                path{
                    fill: teal
                }
            }
        }
}
.cart-item:not(:last-child){
    border-bottom: none;
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