import { defineStore } from 'pinia';

export const store = defineStore('store', {
    state: () => ({
      count: 0,
      store: [] 
    }),
  
    getters: {
      doubleCount: (state) => state.count * 2,
    },
  
    actions: {
      increment() {
        this.count++;
      },
      decrement() {
        this.count--;
      },
    },
  });