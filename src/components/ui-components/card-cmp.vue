<template>
    <div class="card">
        <h2 class="card__title">Выбранный контакт</h2>
        <div v-if="card">
            <p><strong>Имя:</strong> {{ card.name }}</p>
            <p><strong>Телефон:</strong> {{ card.tel }}</p>
            <p><strong>Почта:</strong> {{ card.email }}</p>
        </div>
        <div v-else class="card__empty">
            <p>Контакт не выбран</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

interface Contact { id: string, name: string, tel: string, email: string }

defineProps<{ card: Contact | null }>()
</script>

<style lang="sass" scoped>
.card
    width: 30%
    max-height: 600px
    overflow-y: auto
    border: 1px solid #ccc
    padding: 16px
    border-radius: 8px
    &__title
        text-align: center
        margin-bottom: 12px

    &__empty
        text-align: center
        color: #999
</style>