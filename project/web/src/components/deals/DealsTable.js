export function renderDealsTable(deals) {
    const tableBody = document.getElementById('deals-table');
    tableBody.innerHTML = '';

    if (deals.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-slate-400">Нет данных</td></tr>`;
        return;
    }

    for (const deal of deals) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4">${deal.id}</td>
            <td class="px-6 py-4">${deal.cityName}</td>
            <td class="px-6 py-4">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full ${
            deal.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }">
                    ${deal.status === 'accepted' ? 'Одобрено' : 'Отклонено'}
                </span>
            </td>
            <td class="px-6 py-4">${deal.reason || '—'}</td>
            <td class="px-6 py-4">${deal.date}</td>
        `;
        tableBody.appendChild(row);
    }
}