<template>
    <div class="aside-cart-container">
        <div class="cart-top-block">
            <h3 class="h3">Корзина</h3>
            <div class="close-button" @click="openCart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path data-name="Rounded Rectangle 114 copy 3" fill="lightgray" class="cccls-1" d="M334.411,138l6.3,6.3a1,1,0,0,1,0,1.414,0.992,0.992,0,0,1-1.408,0l-6.3-6.306-6.3,6.306a1,1,0,0,1-1.409-1.414l6.3-6.3-6.293-6.3a1,1,0,0,1,1.409-1.414l6.3,6.3,6.3-6.3A1,1,0,0,1,340.7,131.7Z" transform="translate(-325 -130)"></path></svg>
            </div>
        </div>
        <div class="cart-main-block">
            <template v-if="cart.length > 0">
                <transition-group name="fade" tag="div">
                    <AsideCartItem v-for="product in cart" :key="product.id" :product="product"/>
                </transition-group>
            </template>
            <template v-else>
                <div class="zero-cart-container">
                    <h3 class="h3">Корзина пуста</h3>
                    <NuxtLink to="/catalog/">
                        <UButton 
                        icon="carbon:catalog-publish"
                        size="xl"
                        @click="openCart"
                        >
                            Каталог
                        </UButton>
                    </NuxtLink>
                </div>
            </template>
        </div>
        <div class="cart-opener" @click="openCart">
            <UChip :text="cartTotalItems" color="teal" size="xl" :show="cartTotalItems > 0">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 1024 1024"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z" fill="currentColor"></path></svg>
            </UChip>
        </div>
        <template v-if="cart.length > 0">
            <div class="cart-bottom-block">
                <div class="bottom-price-container">
                    <span class="clear-cart" @click="clearCart">
                        Очистить
                    </span>
                    <span class="total-price">Итого: {{ cartTotalPrice }}</span>
                </div>
                <div class="bottom-button-container">
                    <NuxtLink to="/cart/" @click="openCart">
                        <button class="bottom-button cart">Перейти в корзину</button>
                    </NuxtLink>
                    <button class="bottom-button fast">Быстрый заказ</button>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { store } from '@/stores/store';
const cartStore = store();

const cart = computed(() => cartStore.totalCart)
const cartTotalItems = computed(() => cartStore.totalItems)
const cartTotalPrice = computed(() => cartStore.totalPrice)
const clearCart = cartStore.clearCart
const openCart = () => {
    document.querySelector('.aside-cart-container')?.classList.toggle('open')
}


onMounted(() => {
  const body = document.body;
  const menu = document.querySelector('.aside-cart-container');

  if (body && menu) {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    body.addEventListener('click', () => {
      document.querySelector('.aside-cart-container')?.classList.remove('open');
    });
  }
});

</script>

<style scoped>
.aside-cart-container{
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 760px;
    box-shadow: 0 0 10px 1px #0001;
    background: white;
    transform: translateX(100%);
    transition: all .2s ease;
    .cart-top-block{
        padding: 38px 47px 0;
        position: relative;
        .h3{
            font-size: 30px;
            font-weight: 700;
        }
        .close-button{
            position: absolute;
            top: 20px;
            right: 20px;
            svg{
                path{
                    transition: all .2s ease;
                }
            }
        }
        .close-button:hover{
            cursor: pointer;
            svg{
                path{
                    fill: teal
                }
            }
        }
    }
    .cart-main-block{
        display: flex;
        margin-top: 40px;
        flex-direction: column;
        flex: 1;
        .zero-cart-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            h3{
                font-size: 24px;
                font-weight: 600;
            }
        }
    }
    .cart-bottom-block{
        display: flex;
        flex-direction: column;
        margin-top: auto;
        z-index: 2;
        .bottom-price-container{
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
            padding: 28px 54px;
            border-top: 1px solid #eee;
            .clear-cart{
                display: flex;
                align-items: center;
                font-size: 14px;
                opacity: .6;
                transition: all .2s ease;
                position: relative;
            }
            .clear-cart::before{
                content: '';
                position: absolute;
                left: -20px;
                width: 15px;
                height: 1px;
                background: black;
                transform: rotate(45deg);
                transition: all .2s ease;
            }
            .clear-cart::after{
                content: '';
                content: '';
                position: absolute;
                left: -20px;
                width: 15px;
                height: 1px;
                background: black;
                transform: rotate(-45deg);
                transition: all .2s ease;
            }
            .clear-cart:hover{
                color: teal;
                opacity: 1;
                cursor: pointer;
                .clear-cart::before{
                    background: teal;
                }
                .clear-cart::after{
                    background: teal;
                }
            }
            .total-price{
                font-weight: 600;
                font-size: 20px;
            }
        }
        .bottom-button-container{
            display: flex;
            width: 100%;
            justify-content: flex-end;
            padding: 50px;
            gap: 20px;
            border-top: 1px solid #eee;
            .bottom-button{
                padding: 16px 26px;
                font-size: 14px;
                text-transform: uppercase;
                border-radius: 5px;
                transition: all .2s ease;
            }
            .cart{
                border: 1px solid teal;
            }
            .cart:hover{
                background: teal;
                color: white;
                cursor: pointer;
            }
            .fast{
                background: teal;
                color: white;
                border: 1px solid transparent;
            }
            .fast:hover{
                color: black;
                border: 1px solid teal;
                background-color: white;
                cursor: pointer;
            }
        }
    }
}
.open{
    transform: translateX(0%);
}


.cart-opener{
    position: absolute;
    top: 250px;
    right: 100%;
    width: 60px;
    height: 60px;
    padding: 15px;
    background-color: white;
    border: 1px solid #ececec;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: all .2s ease;
}

.cart-opener:hover{
    background: #f8f8f8;
    cursor: pointer;
}


.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

</style>