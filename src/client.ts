import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface ApiClientOptions {
    baseUrl: string;
    apiKey: string;
}

export class ApiClient {
    client: AxiosInstance;
    apiKey: string;

    constructor(options: ApiClientOptions) {
        this.client = axios.create({
            baseURL: options.baseUrl,
        });
        this.apiKey = options.apiKey;

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

    async getHighestConvertingLocations() {
        const url = 'marketdata/get_highest_converting_locations';
        return await this.client.get(url);
    }
}
