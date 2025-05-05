import Modal from '@/components/modal/index';
import { refreshDeals } from '@/components/deals/index';

export function setupHeader() {
    const openModalBtn = document.querySelector('header button');

    if (!openModalBtn) {
        console.error('Кнопка для открытия модалки не найдена!');
        return;
    }

    const modalInstance = Modal({
        onSuccess: refreshDeals,
    });

    openModalBtn.addEventListener('click', () => {
        modalInstance.show();
    });
}