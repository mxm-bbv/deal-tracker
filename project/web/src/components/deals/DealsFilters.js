import { renderDealsTable } from "@/components/deals/DealsTable.js";
import { renderDealsStats } from "@/components/deals/DealsStats.js";
import { generateSelectOptions } from "@/utils/SelectOptions.js";

export function setupDealsFilters(deals, cities) {
    const filters = {
        city: document.getElementById('filter-city'),
        status: document.getElementById('filter-status'),
        date: document.getElementById('filter-date'),
    };

    generateSelectOptions(filters.city, cities, true);

    function applyFilters() {
        const timezone = import.meta.env.VITE_TIMEZONE || 'Asia/Almaty';
        const today = new Date();
        const todayStr = new Intl.DateTimeFormat('en-GB', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(today);

        const formattedTodayStr = todayStr.split('/').reverse().join('-');

        const filteredDeals = deals.filter(deal => {
            const cityMatch = !filters.city.value || deal.city.toString() === filters.city.value;
            const statusMatch = !filters.status.value || deal.status === filters.status.value;
            const dateMatch = filters.date.value === 'all' ||
                (filters.date.value === 'today' && deal.date === formattedTodayStr);

            return cityMatch && statusMatch && dateMatch;
        });

        renderDealsTable(filteredDeals);
        renderDealsStats(deals);
    }

    const onFilterChange = () => {
        applyFilters();
    };

    filters.city.addEventListener('change', onFilterChange);
    filters.status.addEventListener('change', onFilterChange);
    filters.date.addEventListener('change', onFilterChange);
}
