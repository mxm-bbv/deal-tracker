export function showError(input, message) {
    clearError(input);

    input.classList.add('border-red-500');

    const error = document.createElement('p');
    error.className = 'text-sm text-red-500 mt-1';
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
}

export function clearError(input) {
    input.classList.remove('border-red-500');
    const next = input.nextElementSibling;
    if (next && next.classList.contains('text-red-500')) {
        next.remove();
    }
}

export function validateForm(citySelect, reasonInput) {
    let valid = true;

    if (!citySelect.value) {
        showError(citySelect, 'Выберите город');
        valid = false;
    } else {
        clearError(citySelect);
    }

    const selectedStatus = document.querySelector('input[name="status"]:checked');
    if (!selectedStatus) {
        alert('Выберите статус: одобрено или отклонено');
        valid = false;
    }

    if (selectedStatus?.value === 'rejected') {
        if (!reasonInput.value.trim()) {
            showError(reasonInput, 'Укажите причину отказа');
            valid = false;
        } else if (reasonInput.value.trim().length > 1000) {
            showError(reasonInput, 'Максимум 1000 символов');
            valid = false;
        } else {
            clearError(reasonInput);
        }
    } else {
        clearError(reasonInput);
    }

    return valid;
}