import DealsServiceModule from '@/services/DealsService.js';
import CitiesServiceModule from '@/services/CitiesService.js';
import {renderDealsTable} from '@/components/deals/DealsTable.js';
import {renderDealsStats} from '@/components/deals/DealsStats.js';
import {setupDealsFilters} from '@/components/deals/DealsFilters.js';

const DealsService = new DealsServiceModule.DealsService(),
    CitiesService = new CitiesServiceModule.CitiesService();

let deals = [],
    cities = [];

async function loadDealsAndCities() {
    const [rawDeals, rawCities] = await Promise.all([
            DealsService.getDeals(),
            CitiesService.getCities()
        ]),
        mappedDeals = rawDeals.map(deal => {
            const city = rawCities.find(c => c.id === deal.city);
            return {
                ...deal,
                cityName: city ? city.name : '—',
            };
        });

    return {
        deals: mappedDeals,
        cities: rawCities
    };
}

console.log(loadDealsAndCities());

async function initDealsUI(extraCallback = () => {}) {
    try {
        const data = await loadDealsAndCities();
        deals = data.deals;
        cities = data.cities;

        renderDealsTable(deals);
        renderDealsStats(deals);
        extraCallback(deals, cities);
    } catch (e) {
        console.error('Ошибка при инициализации данных:', e.message);
    }
}

export async function refreshDeals() {
    await initDealsUI();
}

export async function setupDeals() {
    await initDealsUI(setupDealsFilters);
}
