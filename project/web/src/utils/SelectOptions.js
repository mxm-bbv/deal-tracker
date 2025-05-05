export function generateSelectOptions(selectElement, cities, isFilter = false) {
    selectElement.innerHTML = '';

    if (isFilter) {
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'Все города';
        selectElement.appendChild(allOption);
    }

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        selectElement.appendChild(option);
    });
}
