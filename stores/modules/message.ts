import { defineStore } from 'pinia';
import type { Message } from '~/types/types';
export const useMessageStore = defineStore('message', {
    state: () => ({
        messages: [] as Message[]
    }),
    actions: {
        addMessage(type: Message['type'], content: string, duration: number = 2000){
            const id = Date.now()
            this.messages.push({id, type, content, duration})

            setTimeout(() => {
                this.removeMessage(id)
            }, duration)
        },
        removeMessage(id: Message['id']){
            this.messages = this.messages.filter(item => item.id !== id)
        }
    }
})