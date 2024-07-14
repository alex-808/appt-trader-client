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
        mock = new MockAdapter(apiClient.clientInstance, {
            onNoMatch: 'throwException',
        });
    });

    it('should create an instance of ApiClient', () => {
        expect(apiClient).toBeInstanceOf(ApiClient);
    });

    it('should have the correct base URL', () => {
        expect(apiClient.clientInstance.defaults.baseURL).toBe(
            'https://api.example.com'
        );
    });

    it('should have correct status on successful requests', async () => {
        mock.onGet(
            'v1/marketdata/get_highest_converting_locations?key=YOUR_API_KEY'
        ).reply(200, {
            ResponseCode: 100,
            ResponseMessage: 'Success',
            RequestPath: 'v1/marketdata/get_highest_converting_locations',
            RequestStatus: 'Succeeded',
        });

        await expect(
            apiClient.marketData.getHighestConvertingLocations()
        ).resolves.toStrictEqual({
            ResponseCode: 100,
            ResponseMessage: 'Success',
            RequestPath: 'v1/marketdata/get_highest_converting_locations',
            RequestStatus: 'Succeeded',
        });
    });
    it('should throw error on failed requests', async () => {
        mock.onGet(
            'v1/marketdata/get_highest_converting_locations?key=YOUR_API_KEY'
        ).reply(500);

        await expect(
            apiClient.marketData.getHighestConvertingLocations()
        ).rejects.toThrow();
    });
});
