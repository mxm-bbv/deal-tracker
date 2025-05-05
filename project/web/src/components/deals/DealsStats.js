export function renderDealsStats(deals) {
    const acceptedEl = document.getElementById('deals-accepted-today'),
        rejectedEl = document.getElementById('deals-rejected-today'),
        todayStr = new Date().toISOString().split('T')[0],

        todayDeals = deals.filter(d => d.date === todayStr),
        rejected = todayDeals.filter(d => d.status === 'rejected').length;

    acceptedEl.textContent = todayDeals.filter(d => d.status === 'accepted').length;
    rejectedEl.textContent = rejected;
}
