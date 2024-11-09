<template>
    <div class="search">
        <inputCmp
            :input_type="input_type"
            :input_value="input_field_value"
            :input_label="input_label"
            @set_value="handleSetValue"
        />
        
        <ul v-if="filtered_contacts.length && input_field_value" class="search__results">
            <li 
                v-for="contact in filtered_contacts" 
                :key="contact.id" 
                class="search__result-item"
                @click="selectContact(contact)"
            >
                {{ contact.name }} - {{ contact.tel }} - {{ contact.email }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'
import inputCmp from './input-cmp/input-cmp.vue'

interface Contact { id: string, name: string, tel: string, email: string }

const props = defineProps<{
    input_type: string
    input_value: string
    input_label: string
    contact_list: Contact[]
}>()

const emit = defineEmits(['update_filtered_contacts', 'select_contact'])

const input_field_value = ref(props.input_value)

// Обработчик для обновления значения инпута
const handleSetValue = (event: { value: string }) => {
    input_field_value.value = event.value
}

// Вычисляемый массив фильтрованных контактов
const filtered_contacts = computed(() =>
    props.contact_list.filter(contact =>
        contact.name.toLowerCase().includes(input_field_value.value.toLowerCase()) ||
        contact.tel.includes(input_field_value.value) ||
        contact.email.toLowerCase().includes(input_field_value.value.toLowerCase())
    )
)

// Очистка инпута после выбора контакта
const clearInput = () => {
    input_field_value.value = ''
}

// Выбор контакта из списка
const selectContact = (contact: Contact) => {
    emit('select_contact', contact)
    clearInput()  // Очищаем инпут после выбора
}
</script>

<style scoped lang="sass">
.search
    position: relative
    width: 100%
    &__results
        position: absolute
        top: 100%
        left: 0
        width: 100%
        background-color: #fff
        border: 1px solid #DBDFE9
        border-radius: 5px
        max-height: 150px
        overflow-y: auto
        margin-top: 5px
        z-index: 1

    &__result-item
        padding: 8px
        cursor: pointer
        &:hover
            background-color: #f0f0f0
</style>
