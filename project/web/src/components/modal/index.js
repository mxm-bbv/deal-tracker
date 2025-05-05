import { generateSelectOptions } from '@/utils/SelectOptions';
import CitiesServiceModule from '@/services/CitiesService';
import DealsServiceModule from '@/services/DealsService';
import Form from '@/components/modal/Form';

const CitiesService = new CitiesServiceModule.CitiesService();
const DealsService = new DealsServiceModule.DealsService();

let instance = null;

export default function Modal({ onSuccess } = {}) {
    if (instance) return instance;

    const modal = document.getElementById('modal');
    const cancelButton = document.getElementById('cancel-button');

    const state = {
        deals: [],
        cities: [],
    };

    function show() {
        modal.classList.remove('hidden');
    }

    function hide() {
        modal.classList.add('hidden');
        Form.reset();
        Form.hide();
    }

    cancelButton.addEventListener('click', hide);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) hide();
    });

    loadDealsAndCities();

    async function loadDealsAndCities() {
        try {
            const [deals, cities] = await Promise.all([
                DealsService.getDeals(),
                CitiesService.getCities()
            ]);

            state.deals = deals.map(deal => {
                const city = cities.find(c => c.id === deal.city);
                return {
                    ...deal,
                    cityName: city ? city.name : '—',
                };
            });

            state.cities = cities;

            generateSelectOptions(document.getElementById('city-select'), cities);

            Form.init({
                onSuccess,
                onClose: hide,
                deals: state.deals,
                cities: state.cities,
            });

        } catch (e) {
            console.error('Ошибка при загрузке данных:', e.message);
        }
    }

    instance = { show, hide };
    return instance;
}
