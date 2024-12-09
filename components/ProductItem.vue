//TODO: Доделать красивый вывод товаров 



<template>
    <div>
        {{ product }}
    </div>
</template>

<script setup lang="ts">


defineProps({
    product:{
        type: Object,
        required: true,
    }
})
</script>

<style scoped>

</style>