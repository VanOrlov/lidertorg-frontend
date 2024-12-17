<template>
    <div class="main-cart container">
        <section class="cart-top-block">
            <h1 class="h1">Корзина</h1>
        </section>
        <section class="cart-main-block">
            <div class="cart-items-container">
                <transition-group name="fade" tag="div">
                    <CartItem v-for="product in cart" :key="product.id" :product="product" />
                </transition-group>
            </div>
            <aside class="cart-order-container">
                <div class="fast-cart-order">
                    <h3 class="h3">Быстрый заказ</h3>
                    <div class="fast-item">
                        <div class="date-container">
                            <span>Дата:</span>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton color="teal" icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />
                                <template #panel="{ close }">
                                    <DatePicker v-model="date" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class="address-container">
                            <span>Адрес:</span>
                            <UInput :value="address" color="teal" placeholder="г. Ярославль, ул. Заволжская, д.2" />
                        </div>
                        <UButton 
                            icon="carbon:catalog-publish"
                            size="xl"
                            color="teal"
                            >
                            Заказ
                        </UButton>
                    </div>
                </div>
            </aside>
        </section>
    </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { store } from "@/stores/store";

const date = ref(new Date())
const address = ref(null)
const cartStore = store();
const cart = computed(() => cartStore.totalCart);
useHead({
    title: 'Корзина | "ЛидерТорг"',
});
</script>

<style scoped>
.cart-top-block {
    padding: 50px 0;

    h1 {
        font-size: 30px;
        font-weight: 600;
    }
}

.cart-main-block {
    display: flex;
    gap: 20px;
    overflow: hidden;
    .cart-items-container {
        width: 75%;
        height: 500px;
    }

    .cart-order-container {
        width: 25%;
        height: 200px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        z-index: 2;
        background: #fff;
        .fast-cart-order {
            display: flex;
            width: 100%;
            padding: 20px;
            flex-direction: column;
            border: 1px solid #eee;
            border-radius: 5px;
            .h3 {
                font-size: 16px;
                font-weight: 600;
            }

            .fast-item {
                display: flex;
                margin-top: 20px;
                flex-direction: column;
                gap: 15px;

                .date-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .address-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 30px;
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%)
}
</style>
