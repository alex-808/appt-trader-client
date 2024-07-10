import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface ApiClientOptions {
    baseUrl: string;
    apiKey: string;
}

function appendQueryParams(url: string, params: Record<string, any>) {
    if (!params) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${new URLSearchParams(params).toString()}`;
}
class MarketDataApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'marketdata/';
    }

    async getHighestConvertingLocations(params?: {
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_highest_converting_locations`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getMostBidsLeastAsks(params?: {
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_most_bids_least_asks`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
    async getMostUnderservedLocations(params?: {
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_most_underserved_locations`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
    async getMostViewedLocationsWithLeastListings(params?: {
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_most_viewed_locations_with_least_listings`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
    async getToplist(params?: {
        cityCode?: string;
        categorySlug?: string;
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_toplist`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class AccountApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'account/';
    }

    async getList(params?: {
        searchFilter?: string;
        includeDepositAccount?: boolean;
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_list`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

export class ApiClient {
    client: AxiosInstance;
    apiKey: string;
    marketData: MarketDataApi;
    account: AccountApi;

    constructor(options: ApiClientOptions) {
        this.client = axios.create({
            baseURL: options.baseUrl,
        });
        this.apiKey = options.apiKey;
        this.marketData = new MarketDataApi(this.client);
        this.account = new AccountApi(this.client);

        this.client.interceptors.request.use((config) => {
            if (config.url) {
                const separator = config.url.includes('?') ? '&' : '?';
                config.url = `${config.url}${separator}key=${this.apiKey}`;
            }
            return config;
        });
    }

    parseResponseBody(response: AxiosResponse) {
        if (response.status === 200) {
            return response.data.Payload.ResponseBody;
        } else {
            throw new Error('Error fetching data');
        }
    }
}
