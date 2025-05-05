import { apiClient } from '@/api/apiClient.js';

class DealsService {
    async getDeals() {
        const response = await apiClient.get('/deals');
        if (!response.data.status) {
            throw new Error(response.data.message || 'Failed to fetch deals.');
        }

        const items = response.data.data?.data || response.data.data;
        return Array.isArray(items) ? items : [];
    }

    async showDeal(id) {
        const response = await apiClient.get(`/deals/${id}`);
        if (!response.data.status) {
            throw new Error(response.data.message || 'Failed to fetch deal.');
        }
        
        const items = response.data.data?.data || response.data.data;
        return Array.isArray(items) ? items : [];
    }

    async addDeal(deal) {
        const response = await apiClient.post('/deals', deal);
        if (!response.data.status) {
            throw new Error(response.data.message || 'Failed to add deal.');
        }

        const items = response.data.data?.data || response.data.data;
        return Array.isArray(items) ? items : [];
    }

    async updateDeal(id, deal) {
        const response = await apiClient.put(`/deals/${id}`, deal);
        if (!response.data.status) {
            throw new Error(response.data.message || 'Failed to update deal.');
        }

        const items = response.data.data?.data || response.data.data;
        return Array.isArray(items) ? items : [];
    }
}   

export default { DealsService };
