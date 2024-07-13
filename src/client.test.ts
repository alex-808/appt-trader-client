import { ApiClient } from './client';
import MockAdapter from 'axios-mock-adapter';

describe('API Client', () => {
    let apiClient: ApiClient;
    let mock: MockAdapter;

    beforeEach(() => {
        apiClient = new ApiClient({
            baseUrl: 'https://api.example.com',
            apiKey: 'YOUR_API_KEY',
        });
        mock = new MockAdapter(apiClient.client, {
            onNoMatch: 'throwException',
        });
    });

    it('should create an instance of ApiClient', () => {
        expect(apiClient).toBeInstanceOf(ApiClient);
    });

    it('should have the correct base URL', () => {
        expect(apiClient.client.defaults.baseURL).toBe(
            'https://api.example.com'
        );
    });

    it('should have the correct API key', () => {
        expect(apiClient.apiKey).toBe('YOUR_API_KEY');
    });

    it('should have correct status on successful requests', async () => {
        mock.onGet(
            '/marketdata/get_highest_converting_locations?key=YOUR_API_KEY'
        ).reply(200, {
            data: {
                ResponseCode: 100,
            },
        });

        expect(
            (await apiClient.marketData.getHighestConvertingLocations()).data
                .ResponseCode
        ).toBe(100);
    });
    it('should throw error on failed requests', async () => {
        mock.onGet(
            '/marketdata/get_highest_converting_locations?key=YOUR_API_KEY'
        ).reply(500);

        await expect(
            apiClient.marketData.getHighestConvertingLocations()
        ).rejects.toThrow();
    });
});
