import {clearError, showError} from "@/components/modal/Errors.js";

export function validateReason(reasonInput) {
    const selectedStatus = document.querySelector('input[name="status"]:checked');
    if (selectedStatus?.value === 'rejected') {
        if (!reasonInput.value.trim()) {
            showError(reasonInput, 'Укажите причину отказа');
        } else if (reasonInput.value.trim().length > 1000) {
            showError(reasonInput, 'Максимум 1000 символов');
        } else {
            clearError(reasonInput);
        }
    } else {
        clearError(reasonInput);
    }
}