import { apiClient } from '@/api/apiClient.js';

class CitiesService {
    async getCities() {
        const response = await apiClient.get('/cities');
        if (!response.data.status) {
            throw new Error(response.data.message || 'Failed to fetch cities.');
        }

        const items = response.data.data?.data || response.data.data;
        return Array.isArray(items) ? items : [];
    }
}

export default { CitiesService };
