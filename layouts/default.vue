<template>
    <div class="layout">
        <header>
            <div class="header-container">
                <div class="header-top-block container">
                    <div class="header-logo">
                        <NuxtLink to="/">
                            <img src="https://lidertorg76.ru/upload/CMax/98f/vi0jgqfguazlmce7gimabzspxjbysc6j.png" alt="Логотип Лидерторг">
                        </NuxtLink>
                    </div>
                    <UChip :text="cartTotalItems" color="teal" size="xl" :show="cartTotalItems > 0">
                        <NuxtLink to="/cart/" class="cart-container">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z" fill="currentColor"></path></svg>
                        </NuxtLink>
                    </UChip>
                </div>
                <div class="header-bottom-block">
                    <nav class="nav-container">
                        <NuxtLink class="header-nav-link" to="/catalog">Каталог</NuxtLink>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Основной контент -->
        <main class="main">
            <NuxtPage />
        </main>

        <!-- Подвал -->
        <footer class="footer">
            <p>&copy; 2024 Ваш сайт. Все права защищены.</p>
        </footer>
        <AsideCart/>
    </div>
</template>
<script setup lang="ts">
import { store } from '@/stores/store';
const cartStore = store();

const cartTotalItems = computed(() => cartStore.totalItems)
</script>
<style>
/* Общая структура */
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
}
.container{
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Шапка */
header {
    width: 100%;
    height: auto;
}
.header-container{
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 20px;
    .header-top-block{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        .cart-container{
            width: 32px;
            height: 32px;
        }
        .cart-container:hover{
            svg{
                fill: teal
            }
        }
    }
    .header-bottom-block{
        display: flex;
        justify-content: space-around;
        background: teal;
        
    }
}
.header-logo{
    max-width: 190px;
    img{
        width: 100%;
    }
}
.nav-container{
    display: flex;
    align-items: center;
    .header-nav-link{
        padding: 20px 10px;
        font-size: 16px;
        color: #fff;
        transition: all .2s ease;

    }
    .header-nav-link:hover{
        background: #00c7c7;
        color: black;
    }
}



/* Основной контент */
.main {
    flex: 1;
    min-height: 200vh;
    /* Заполняет всё свободное пространство */
}

/* Подвал */
.footer {
    background: teal;
    color: #fff;
    text-align: center;
    padding: 10px 20px;
}
</style>