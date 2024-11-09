<template>
    <div class="contact">
        <span class="contact__name">{{ name }}</span>
        <span class="contact__tel">{{ tel }}</span>
        <span class="contact__email">{{ email }}</span>
        <div class="contact__icons">
            <button
                class="contact__icons__btn"
                @click="editContact"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.2178 3.94399L12.0953 2.09796C13.1323 1.07843 14.8135 1.07843 15.8504 2.09796L17.7279 3.94399C18.7648 4.96352 18.7648 6.61651 17.7279 7.63604L15.8504 9.48207M10.2178 3.94399L2.56463 11.4688C2.1365 11.8897 1.86755 12.4419 1.80237 13.0338L1.34134 17.2201C1.24381 18.1057 2.05713 18.8251 2.9425 18.6363L6.77269 17.82C7.27079 17.7138 7.72729 17.4689 8.08768 17.1146L15.8504 9.48207M10.2178 3.94399L15.8504 9.48207M13.0341 18.4932H18.6667" stroke="#99A1B7" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
            <button
                class="contact__icons__btn"
                @click="deleteContact"
            >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 5.5L12.4558 2.86754C12.1836 2.05086 11.4193 1.5 10.5585 1.5H7.44152C6.58066 1.5 5.81638 2.05086 5.54415 2.86754L5 5.5M3 6.3V7C3 7 3 7 3 7C3 7 3 9.0552 3 10.0823V16.5C3 18.7091 4.79086 20.5 7 20.5H11C13.2091 20.5 15 18.7091 15 16.5V10.0823C15 9.05522 15 7.00003 15 7C15 7 15 7 15 7V6.3M0.75 5.5H17.25" stroke="#99A1B7" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
        name: {
            type: String
        },
        tel: {
            type: String
        },
        email: {
            type: String
        },
        id: {
            type: String
        }
})

const emit = defineEmits(['delete_contact'])

const store = useStore()

const editContact = () => {
    store.commit('modal_module/openModal', { 
        id: props.id,
        name: props.name,
        tel: props.tel,
        email: props.email,
        is_edit: true 
    })
}

const deleteContact = () => {
    store.commit('modal_module/closeModal')
    emit('delete_contact', {
        id: props.id,
        name: props.name,
        tel: props.tel,
        email: props.email
    })
}
</script>

<style lang="sass">
.contact
    background-color: #DBDFE933
    display: flex
    color: #252F4A
    padding: 18px 20px
    border-radius: 10px
    &__name, &__tel, &__email
        width: 200px
        font-family: 'Courier', monospace
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis

    &__tel
        border-left: 2px solid #DBDFE9
        border-right: 2px solid #DBDFE9
        padding: 0px 25px
        margin: 0px 25px
        width: 170px
        text-align: center

    &__icons
        display: flex
        flex-direction: row
        gap: 20px
        margin-left: auto
        &__btn
            cursor: pointer
            display: flex
            justify-content: center
            align-items: center
            width: 24px
            height: 24px
            transition: all .2s
            &:hover 
                svg
                    path
                        stroke: #BDC4E3
                        transition: stroke 0.2s

            &:active 
                svg
                    path
                        stroke: #E0E5F8
                        transition: stroke 0.1s
</style>