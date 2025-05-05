import { clearError, validateForm } from '@/components/modal/Errors.js';
import { validateReason } from '@/components/modal/Fields.js';
import DealsServiceModule from '@/services/DealsService.js';
import {renderDealsTable} from "@/components/deals/DealsTable.js";
import {renderDealsStats} from "@/components/deals/DealsStats.js";

const DealsService = new DealsServiceModule.DealsService();

export default {
    init({ onSuccess, onClose, deals, cities }) {
        const form = document.getElementById('deal-form'),
            reasonContainer = document.getElementById('reason-container'),
            reasonInput = document.getElementById('reason'),
            citySelect = form.querySelector('#city-select'),
            statusInputs = form.querySelectorAll('input[name="status"]');

        statusInputs.forEach(input => {
            input.addEventListener('change', () => {
                const selected = form.querySelector('input[name="status"]:checked');
                reasonContainer.classList.toggle('hidden', selected?.value !== 'rejected');
                validateReason(reasonInput);
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm(citySelect, reasonInput)) return;

            const cityId = parseInt(citySelect.value),
                status = form.querySelector('input[name="status"]:checked').value,
                reason = status === 'rejected' ? reasonInput.value.trim() : null;

            const newDeal = { city_id: cityId, status, reason };

            try {
                await DealsService.addDeal(newDeal);
                location.reload();
            } catch (err) {
                alert('Ошибка при добавлении: ' + err.message);
            }
        });

    },

    reset() {
        const form = document.getElementById('deal-form');
        form.reset();
        clearError(document.getElementById('city-select'));
        clearError(document.getElementById('reason'));
    },

    hide() {
        const modal = document.getElementById('modal');
        modal.classList.add('hidden');
    }
};
