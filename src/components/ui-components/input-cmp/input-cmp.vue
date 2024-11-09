<template>
    <div class="test-input">
        <input 
            class="test-input__field"
            :class="{'_fill-input': input_field_value.value.length}"
            :type="input_type"
            v-model="input_field_value.value"
            @keyup="setValue"
            v-bind="$attrs"
        />
        <label class="test-input__label">{{ input_label }}</label>
        <div class="test-input__message" v-if="input_error.length">
            <i>
                <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.9989 4.49816V6.49816M5.9989 8.49816H6.0039M5.30656 1.94402L1.19412 9.04733C0.966015 9.44133 0.851963 9.63833 0.86882 9.80001C0.883523 9.94103 0.957408 10.0692 1.07209 10.1526C1.20357 10.2482 1.4312 10.2482 1.88646 10.2482H10.1113C10.5666 10.2482 10.7942 10.2482 10.9257 10.1526C11.0404 10.0692 11.1143 9.94103 11.129 9.80001C11.1458 9.63833 11.0318 9.44133 10.8037 9.04733L6.69124 1.94402C6.46396 1.55144 6.35032 1.35515 6.20205 1.28922C6.07272 1.23172 5.92508 1.23172 5.79575 1.28922C5.64749 1.35515 5.53384 1.55144 5.30656 1.94402Z" stroke="#FF6E6D" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
			</i>
            <span class="test-input__message__error">{{ input_error }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, reactive, watch } from 'vue'

const props = defineProps({
    input_type: {
        type: String,
        default: 'text'
    },
    input_value: {
        type: String,
        default: ''
    },
    input_label: {
        type: String,
        default: 'label'
    },
    input_error: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['set_value'])

const input_field_value = reactive({
    value: props.input_value
})

watch(() => props.input_value, (new_value) => {
    input_field_value.value = new_value
})

const setValue = () => {
    emit('set_value', {value: input_field_value.value, type: props.input_type})
}
</script>
