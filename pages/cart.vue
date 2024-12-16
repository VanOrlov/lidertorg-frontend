<template>
    <div class="main-cart container">
        <section class="cart-top-block">
            <h1 class="h1">Корзина</h1>
        </section>
        <section class="cart-main-block">
            <div class="cart-items-container">
                <CartItem v-for="product in cart" :key="product.id" :product="product" />
            </div>
            <aside class="cart-order-container">
                <div class="fast-cart-order">
                    <h3 class="h3">Быстрый заказ</h3>
                    <div class="fast-item">
                        <div class="date-container">
                            <span>Дата:</span>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />
                                <template #panel="{ close }">
                                    <DatePicker v-model="date" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class="adress-container">
                            <span>Адресс:</span>
                            <UInput :value="adress" color="teal" placeholder="г. Ярославль, ул. Заволжская, д.2" />
                        </div>
                        <UButton>Заказать</UButton>
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
const adress = ref(null)
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
                .adress-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }
}
</style>
