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
        ).rejects.toThrow('Request failed with status code 500');
    });

    it('should create correct URL for given flat params', async () => {
        const url = apiClient.account.appendQueryParams('www.test.com', {
            key: 'value',
        });

        expect(url).toBe('www.test.com?key=value');
    });

    it('should create correctly encoded URL for given deep params', async () => {
        const url = apiClient.account.appendQueryParams('www.test.com', {
            key: {
                nested: 'value',
            },
        });

        expect(url).toBe('www.test.com?key=%7B%22nested%22%3A%22value%22%7D');
    });

    it('should handle undefined params in appendQueryParams', () => {
        const url = apiClient.account.appendQueryParams(
            'www.test.com',
            undefined
        );

        expect(url).toBe('www.test.com');
    });

    it('should handle network error', async () => {
        mock.onGet(
            'v1/marketdata/get_highest_converting_locations?key=YOUR_API_KEY'
        ).networkError();

        await expect(
            apiClient.marketData.getHighestConvertingLocations()
        ).rejects.toThrow('Network Error');
    });
    it('should handle request timeout', async () => {
        mock.onGet(
            'v1/marketdata/get_highest_converting_locations?key=YOUR_API_KEY'
        ).timeout();

        await expect(
            apiClient.marketData.getHighestConvertingLocations()
        ).rejects.toThrow('timeout of 0ms exceeded');
    });
});
