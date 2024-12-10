import type { CartItem } from '@/types/types'

import { defineStore } from 'pinia';

export const store = defineStore('store', {
    state: () => ({
      cart: [] as CartItem[]
    }),
  
    getters: {
      totalItems: (state): number => { //Получение кол-во товаров в корзине
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice: (state): number => { //Получение общей цены корзины
        return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      totalCart: (state): CartItem[] => {
        return state.cart
      }
    },
  
    actions: {
      addToCart(item: CartItem): void { //Добавление товара в корзину или обновление его количества
        const existingItem = this.cart.find(i => i.id === item.id); // Проверяем, есть ли уже такой товар в корзине
        
        if (existingItem) {
          existingItem.quantity += item.quantity; // Если товар уже есть, увеличиваем его количество
        } else {
          this.cart.push(item); // Если товара нет, добавляем его в корзину
        }
      },
      incrementProduct(id: number): void { //Увеличение кол-ва товара 
        const item = this.cart.find((product) => product.id === id);
        if (item) {
          item.quantity++;
        }
      },
      decrementProduct(id: number): void { //Уменьшение кол-в товара 
        const item = this.cart.find((product) => product.id === id);
        if (item?.quantity == 1) {
          this.cart = this.cart.filter(item => item.id !== id); //Если кол-во товара равно 1, и он уменьшается, то удаляем его из корзины
        }
        if (item) {
          item.quantity--;
        }
      },
      removeFromCart(id: number): void { // Удаление товара из корзины
        this.cart = this.cart.filter(item => item.id !== id);
      },
      clearCart(): void { // Очистить корзину
        this.cart = [];
      },
    },
  });