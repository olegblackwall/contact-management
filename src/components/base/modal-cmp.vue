<template>
    <transition name="fade">
        <div class="test-modal" v-if="modal_state.is_modal">
            <div @click="closeModal()" class="test-modal__shadow"></div>
            <div class="test-modal__container">
                <span class="modal-name">{{ modal_state.is_edit ? 'Редактирование контакта' : 'Добавление контакта' }}</span>
                <div class="modal-inputs-list" v-for="input in inputs_list" :key="input.id">
                    <inputCmp 
                        :input_label="input.label"
                        :input_value="input.value"
                        :input_error="input.error"
                        @set_value="updateInputValue(input.id, $event.value)"
                    />
                </div>
                <btnCmp 
                    class="modal-btn"
                    :btn_text="modal_state.is_edit ? 'Редактировать контакт' : 'Добавить контакт'"
                    @click="modal_state.is_edit ? editContact() : addContact()"
                />
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { defineComponent, defineEmits, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import inputCmp from '@/components/ui-components/input-cmp/input-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue'

const emit = defineEmits(['update_contact', 'add_contact'])
const store = useStore()
const modal_state = store.state.modal_module

// Входные данные для модального окна
const inputs_list = reactive([
    { 
        id: 'name', 
        label: 'Имя', 
        value: '',
        pattern: `^[A-Za-zА-Яа-яЁё\\-'\`" ]+$`, 
        error: '', 
        required: true, 
        valid: false
    },
    { 
        id: 'tel', 
        label: 'Телефон', 
        value: '',
        pattern: '^[0-9]+$', 
        error: '', 
        required: true, 
        valid: false
    },
    { 
        id: 'email', 
        label: 'Почта', 
        value: '',
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i, 
        error: '', 
        required: true, 
        valid: false
    },
])

const validCheck = (input: { value: string; pattern: string | RegExp; id: string; error: string | null; required: boolean; valid: boolean }) => {
    const regExp = new RegExp(input.pattern, 'i')

    if (input.value) {
        if (input.id === 'email' && !input.value.match(/@/)) {
            input.error = 'Введите корректный email'
            input.valid = false
        }
        else if (!regExp.test(input.value)) {
            input.error = 'Неверный формат ввода'
            input.valid = false
        } else {
            input.error = ''
            input.valid = true
        }
    } 
    else if (!input.value.length && input.required) {
        input.error = 'Поле обязательно к заполнению'
        input.valid = false
    }
}

// Проверка валидации всех полей
const validateAllFields = () => {
    inputs_list.forEach(input => validCheck(input))
    return inputs_list.every(input => input.valid)
}

// Обработка открытия/закрытия модального окна
watch(() => modal_state.is_modal, (is_modal) => {
    if (is_modal) {
        if (modal_state.is_edit) {
            inputs_list.find(input => input.id === 'name')!.value = modal_state.data.name
            inputs_list.find(input => input.id === 'tel')!.value = modal_state.data.tel
            inputs_list.find(input => input.id === 'email')!.value = modal_state.data.email
        } else {
            inputs_list.forEach(input => input.value = '')
        }
    }
})

const updateInputValue = (id: string, new_value: string) => {
    const input = inputs_list.find(input => input.id === id)
    if (input) input.value = new_value
}

// Использование в addContact и editContact
const addContact = () => {
    validateAllFields()
    if (validateAllFields()) {
        const new_contact = {
            name: inputs_list.find(input => input.id === 'name')!.value,
            tel: inputs_list.find(input => input.id === 'tel')!.value,
            email: inputs_list.find(input => input.id === 'email')!.value
        }
        emit('add_contact', new_contact)
        closeModal()
    }
}

const editContact = () => {
    validateAllFields()
    if (validateAllFields()) {
        const updated_data = {
            id: modal_state.data.id,
            name: inputs_list.find(input => input.id === 'name')!.value,
            tel: inputs_list.find(input => input.id === 'tel')!.value,
            email: inputs_list.find(input => input.id === 'email')!.value
        }
        emit('update_contact', updated_data)
        closeModal()
    }
}

const closeModal = () => {
    store.commit('modal_module/closeModal')
    inputs_list.forEach(input => input.error = '')
}

defineComponent({
    components: {
        inputCmp,
        btnCmp
    }
})
</script>

<style lang="sass">
.test-modal 
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100vw
    display: flex
    align-items: center
    justify-content: center
    &__shadow 
        height: 100%
        width: 100%
        position: absolute
        background: rgba(0, 0, 0, 0.30)

    &__container 
        width: 478px
        padding: 20px
        border-radius: 15px
        background-color: #fff
        z-index: 4  
        display: flex
        flex-direction: column
        gap: 20px

.modal-title
    color: #252F4A

.modal-inputs-list
    position: relative

.input-color-settings
    position: absolute
    display: flex
    flex-direction: row
    gap: 10px
    right: 24px
    top: 22px
    align-items: center

.modal-btn
    border-radius: 15px
</style>