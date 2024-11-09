<template>
    <div class="contact-management-page">
        <h1 class="contact-management-page__title">Contact Management</h1>
        <div class="contact-management-page__container">
            <div class="contact-management-page__container__contact-list">
                <searchCmp
                    :input_type="'text'"
                    :input_value="''" 
                    :input_label="'Поиск контактов...'"
                    :contact_list="contact_list" 
                    @update_filtered_contacts="updateFilteredContacts"
                    @select_contact="select_contact"
                />
                <transition-group name="fadeHeight">
                    <div class="contact-management-page__container__contact-list__contacts" v-for="(contact, contact_id) in filtered_contacts" :key="contact_id">
                        <contactCmp 
                            :name="contact.name"
                            :tel="contact.tel"
                            :email="contact.email"
                            :id="contact.id"
                            @delete_contact="removeContact(contact.id)"
                        />
                    </div>
                </transition-group>
                <btnCmp 
                    class="contact-management-page__container__contact-list__btn"
                    :btn_text="'Добавить контакт'"
                    @click="addContact"
                />
            </div>
            <cardCmp 
                class="contact-management-page__container__card"
                :card="selected_contact" 
            />
        </div>
    </div>
    <modalCmp 
        @update_contact="updateContact" 
        @add_contact="addNewContact" 
    />
</template>

<script lang="ts" setup>
import { defineComponent, reactive, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import contactCmp from '@/components/ui-components/contact-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue'
import modalCmp from '@/components/base/modal-cmp.vue'
import searchCmp from '@/components/ui-components/search-cmp.vue'
import cardCmp from '@/components/ui-components/card-cmp.vue'

interface Contact { id: string, name: string, tel: string, email: string }

const store = useStore()

// Список контактов
const contact_list = reactive<Contact[]>([])

const filtered_contacts = ref<Contact[]>([])
const selected_contact = ref<Contact | null>(null)

// Получение контактов с "сервера" (mock-API)
const getContact = () => {
    axios
        .get('/api/contacts.json')
        .then((response) => {
            console.log(response.data, 'getContact API')
            contact_list.push(...response.data.contacts)
            filtered_contacts.value = contact_list
            localStorage.setItem('contacts', JSON.stringify(contact_list))
        })
        .catch((error) => {
            console.log('Ошибка загрузки контактов с API:', error)
        })
}

onMounted(() => {
    const stored_contacts = localStorage.getItem('contacts')
    if (stored_contacts) {
        contact_list.push(...JSON.parse(stored_contacts))
        filtered_contacts.value = contact_list
    } else {
        // Загрузка контактов при первом запуске проекта
        getContact()
    }
})

// Обновление списка контактов в localstorage при каждом изменении списка
watch(contact_list, (new_list) => {
    localStorage.setItem('contacts', JSON.stringify(new_list))
    filtered_contacts.value = new_list
}, { deep: true })

const updateFilteredContacts = (new_filtered_contacts: Contact[]) => {
    filtered_contacts.value = new_filtered_contacts
}

// Добавление нового контакта
const addNewContact = (new_contact: { name: string, tel: string, email: string }) => {
    contact_list.push({ id: String(Date.now()).slice(-5), ...new_contact })
    localStorage.setItem('contacts', JSON.stringify(contact_list))
}

// Обновление контакта
const updateContact = (updated_data: Contact) => {
    store.commit('modal_module/updateContactData', updated_data)
    const contact = contact_list.find(contact => contact.id === updated_data.id)
    if (contact) {
        Object.assign(contact, updated_data)
        localStorage.setItem('contacts', JSON.stringify(contact_list))
    }
}

// Открывает модальное окно для добавления контакта
const addContact = () => {
    store.commit('modal_module/openModal', { name: '', tel: '', email: '', is_edit: false })
}

const removeContact = (contact_id: string) => {
    const index = contact_list.findIndex(contact => contact.id === contact_id)
    if (index !== -1) {
        contact_list.splice(index, 1)
        localStorage.setItem('contacts', JSON.stringify(contact_list))
    }
    // Очистка карточки при удалении выбранного контакта
    if (selected_contact.value && selected_contact.value.id === contact_id) {
        selected_contact.value = null
    }
}

const select_contact = (contact: Contact) => {
    selected_contact.value = contact
}

defineComponent({
    components: {
        contactCmp,
        btnCmp,
        modalCmp,
        searchCmp,
        cardCmp
    }
})
</script>

<style lang="sass">
.contact-management-page
    background-color: #fff
    &__title
        border-bottom: solid 1px #DBDFE9
        padding: 30px 0 30px 10px
        margin-bottom: 40px
        width: 100%
        color: #252F4A

    &__container
        width: 100%
        display: flex
        justify-content: space-between
        gap: 32px
        height: 100vh
        overflow: auto
        &__contact-list
            display: flex
            flex-direction: column
            gap: 6px
            width: 65%
            &__btn
                border-radius: 10px
                margin-top: 30px
        &__card
            position: sticky
            top: 0px

.fade-enter, .fade-leave-to
  opacity: 0

.fade-enter-to, .fade-leave
  opacity: 1

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s
</style>