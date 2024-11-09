export default {
    namespaced: true,
    state: {
        is_modal: false as Boolean,
        data: {
            id: '' as String, 
            name: '' as String,
            tel: '' as String,
            email: '' as String
        },
        is_edit: false as Boolean
    },
    getters: {},
    mutations: {
        openModal(state: { is_modal: Boolean, is_edit: Boolean, data: { id: String, name: String, tel: String, email: String }}, payload: { id: String, name: String, tel: String, email: String, is_edit: Boolean }) {
            state.is_modal = true
            state.is_edit = payload.is_edit  
            state.data.id = payload.id
            state.data.name = payload.name
            state.data.tel = payload.tel
            state.data.email = payload.email
        },
        closeModal(state: { is_modal: Boolean, is_edit: Boolean, data: { id: String, name: String, tel: String, email: String }}) {
            state.is_modal = false
            state.is_edit = false
            state.data = {
                id: '',
                name: '',
                tel: '',
                email: ''
            }
        },
        // Обновление данных сектора
        updateContactData(state: {data: { id: String, name: String, tel: String, email: String }}, updatedData: { id: String, name: String, tel: String, email: String }) {
            state.data.id = updatedData.id 
            state.data.name = updatedData.name
            state.data.tel = updatedData.tel
            state.data.email = updatedData.email
        }
    }
}