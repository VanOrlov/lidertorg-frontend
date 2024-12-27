<template>
    <div :class="{show: messages.length > 0}" class="message-container" >
      <transition-group class="fade-messages" name="fade" tag="div">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['message', msg.type]"
        >
          {{ msg.content }}
          <i class="close-message" @click="deleteMessage(msg.id)">
            <img src="@/public/close.svg" alt="">
          </i>
        </div>
      </transition-group>
    </div>
  </template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { store } from "@/stores/store";

const mainStore = store()

const messageStore = mainStore.messageModule()

const { messages } = storeToRefs(messageStore)

const deleteMessage = function(id: number): void{
  mainStore.deleteMessage(id)
}
</script>

<style scoped>
.message-container {
  display: flex;
  position: fixed;
  gap: 5px;
  top: 0;
  right: 50%;
  transition: all .2s ease;
  transform: translateX(50%) translateY(-150%);
  z-index: 9999;
}
.show{
  transform: translateX(50%) translateY(20px);
}

.message {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
  border-radius: 5px;
  max-width: 500px;
  color: white;
  font-weight: bold;
}

.close-message{
  display: block;
  width: 18px;
  height: 18px;
  transition: all .2s ease;
  img{
    width: 100%;
    height: 100%;
  }
}
.close-message:hover{
  background: #fff2;
  cursor: pointer
}

.success {
  background: #4caf50;
}

.error {
  background: #f44336;
}

.info {
  background: #2196f3;
}

.warning {
  background: #ff9800;
}

.fade-messages{
  display: flex;
  flex-direction: column-reverse;
  gap: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>