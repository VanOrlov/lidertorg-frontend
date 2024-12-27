import type { CartItem, Message } from '@/types/types'
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { useMessageStore } from './modules/message';

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
      decrementProduct(id: number): void { //Уменьшение кол-ва товара 
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
      // Сохранение состояния корзины в cookie
      saveToCookie(): void {
        Cookies.set('cart', JSON.stringify(this.cart), { expires: 7 }); // Cookie действует 7 дней
      },

      // Загрузка состояния корзины из cookie
      loadFromCookie(): void {
        const cartCookie = Cookies.get('cart');
        if (cartCookie) {
          this.cart = JSON.parse(cartCookie);
        }
      },

      //-------------------Модуль useMessageStore----------------
      messageModule(){
        return useMessageStore()
      },

      showMessage(type: Message['type'], content: Message['content'], duration?: number){
        const messageStore = this.messageModule()
        messageStore.addMessage(type, content, duration)
      },
      deleteMessage(id: number){
        const messageStore = this.messageModule()
        messageStore.removeMessage(id)
      }
    },
  });