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
                                <UButton color="teal" icon="i-heroicons-calendar-days-20-solid" :label="format(fast_order.date, 'd MMM, yyy')" />
                                <template #panel="{ close }">
                                    <DatePicker v-model="fast_order.date" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class="address-container">
                            <span>Адрес:</span>
                            <UInput :value="fast_order.address" color="teal" placeholder="г. Ярославль, ул. Заволжская, д.2" />
                        </div>
                        <UButton 
                            icon="carbon:catalog-publish"
                            size="xl"
                            color="teal"
                            @click="sendOrder(fast_order)"
                            >
                            Заказ
                        </UButton>
                    </div>
                </div>
                <div class="fast-cart-order">
                    <h3 class="h3">Заказ</h3>
                    <div class="fast-item">
                        <div class="date-container">
                            <span>Дата:</span>
                            <UPopover :popper="{ placement: 'bottom-start' }">
                                <UButton color="teal" icon="i-heroicons-calendar-days-20-solid" :label="format(default_order.date, 'd MMM, yyy')" />
                                <template #panel="{ close }">
                                    <DatePicker v-model="default_order.date" is-required @close="close" />
                                </template>
                            </UPopover>
                        </div>
                        <div class="address-container">
                            <span>Адрес:</span>
                            <UInput :value="default_order.address" color="teal" placeholder="г. Ярославль, ул. Заволжская, д.2" />
                        </div>
                        <div class="address-container">
                            <span>Имя:</span>
                            <UInput :value="default_order.name" color="teal" placeholder="Сергей" />
                        </div>
                        <div class="address-container">
                            <span>Телефон:</span>
                            <UInput :value="default_order.phone" color="teal" placeholder="89095526596" />
                        </div>
                        <div class="address-container">
                            <span>Почта:</span>
                            <UInput :value="default_order.mail" color="teal" placeholder="example@gmail.com" />
                        </div>
                        <UButton 
                            icon="carbon:catalog-publish"
                            size="xl"
                            color="teal"
                            @click="sendOrder(default_order)"
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

const cartStore = store();
const cart = computed(() => cartStore.totalCart);

const fast_order = ref({ //Сделать доступным только зарегестрированным пользователям
    address: '',
    date: Date.now(),
    type: 'fast_order',
    items: cart,
})

const default_order = ref({
    address: '',
    date: Date.now(),
    name: '',
    phone: 0,
    mail: '',
    type: 'default_order'
})

useHead({
    title: 'Корзина | "ЛидерТорг"',
});


function sendOrder (obj: unknown) {
    console.log(obj);
    
}
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
}
</style>
