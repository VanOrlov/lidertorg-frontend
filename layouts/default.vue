<template>
    <div class="layout">
        <header>
            <div class="header-container container">
                <div class="header-logo">
                    <NuxtLink to="/">
                        <img src="https://lidertorg76.ru/upload/CMax/98f/vi0jgqfguazlmce7gimabzspxjbysc6j.png" alt="Логотип Лидерторг">
                    </NuxtLink>
                </div>
                <nav class="nav-container">
                    <NuxtLink to="/catalog">Каталог</NuxtLink>
                </nav>
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
    </div>
</template>

<style>
/* Общая структура */
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
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
    background: teal;
}
.header-container{
    display: flex;
    padding: 10px 0;
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

}



/* Основной контент */
.main {
    flex: 1;
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