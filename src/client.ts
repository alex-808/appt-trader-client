import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface ApiClientOptions {
    baseUrl: string;
    apiKey: string;
}

interface ApiData {
    RequestPath: string;
    RequestStatus: string;
    ResponseCode: number;
    ResponseMessage: string;
    Payload?: any;
}

type ApiResponse = AxiosResponse<ApiData>;

function appendQueryParams(url: string, params: Record<string, any>) {
    if (!params) return url;
    const { explain, ...restParams } = params;
    const queryParams = explain ? 'explain' : restParams;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${new URLSearchParams(queryParams).toString()}`;
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
        explain?: boolean;
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
        explain?: boolean;
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
        explain?: boolean;
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
        explain?: boolean;
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
        explain?: boolean;
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
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_list`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        const response = await this.client.get<ApiData>(url);
        return response;
    }
}

class LocationApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'location/';
    }

    async getCategory(params: { locationAlias: string; explain?: boolean }) {
        let url = `${this.baseUrl}get_category`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
    async getComparableTrades(params: {
        locationAlias: string;
        dateTime: string;
        inventoryTypeID: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_comparable_trades`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getInventoryTypes(params: {
        locationAlias: string;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_inventory_types`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getMetricHistory(params: {
        locationAlias: string;
        metricList?: string;
        interval?: string;
        dateRangeStart: string;
        dateRangeEnd: string;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_metric_history`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getMetrics(params: {
        locationAlias: string;
        dateRangeStart: string;
        dateRangeEnd: string;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_metrics`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // TODO
    // set_listing
    // set_subscribe_to_city_area_priority_bids
    // set_subscribe_to_location_priority_bids
    // set_unlock_exact_listing_times
    // set_unsubscribe_to_city_area_priority_bids
    // set_unsubscribe_to_location_priority_bids
}

class ListingApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'listing/';
    }

    async getCompetingListings(params: {
        listingId: string;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_competing_listings`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getPorfolioListings(params?: {
        getPopularityScoreBracket?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_portfolio_listings`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // TODO
    // set_archive
    // set_cancel_bid
    // set_create_from_template
    // set_fill_bid
    // set_market_visibility
    // set_price
}

class PortfolioApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'portfolio/';
    }

    async getValidLocationIdentifiers(params?: {
        searchFilter?: string;
        pageSize?: number;
        pageNumber?: number;
    }) {
        let url = `${this.baseUrl}get_valid_location_identifiers`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class BidApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'bid/';
    }

    async getList(params?: { pageSize?: number; pageNumber?: number }) {
        let url = `${this.baseUrl}get_list`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class MedalApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'medal/';
    }

    async getAchievementBonusTypes(params?: {
        searchFilter?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_achievement_bonus_types`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getAvailableMedalCategories(params?: {
        searchFilter?: string;
        restrictToSponsorableByUserAlias?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_available_medal_categories`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getAvailableMedals(params: {
        medalCategorySlug: string;
        searchFilter?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_available_medals`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getAvailablePermissions(params?: {
        searchFilter?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_available_permissions`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getAvailableRequirements(params?: {
        searchFilter?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_available_requirements`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class UserApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'user/';
    }

    async get(params?: {
        searchFilter?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getTransactionHistory(params?: {
        locationAlias?: string;
        returnCreatedAppointmentTransactionsOnly?: boolean;
        transactionType?: string;
        status?: string;
        dateTimeRangeStart?: string;
        dateTimeRangeEnd?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_transaction_history`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class ToolsApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'tools/';
    }

    async getConvertCurrency(params: {
        currencyAmountInSmallestPossibleUnit: number;
        sourceCurrencyCode: string;
        destinationCurrencyCode: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}get_convert_currency`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async getGeoipData(params: { ipAddress: string; explain?: boolean }) {
        let url = `${this.baseUrl}get_geoip_data`;
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
    location: LocationApi;
    listing: ListingApi;
    porfolio: PortfolioApi;
    bid: BidApi;
    user: UserApi;
    tools: ToolsApi;

    constructor(options: ApiClientOptions) {
        this.client = axios.create({
            baseURL: options.baseUrl,
        });
        this.apiKey = options.apiKey;
        this.marketData = new MarketDataApi(this.client);
        this.account = new AccountApi(this.client);
        this.location = new LocationApi(this.client);
        this.listing = new ListingApi(this.client);
        this.porfolio = new PortfolioApi(this.client);
        this.bid = new BidApi(this.client);
        this.user = new UserApi(this.client);
        this.tools = new ToolsApi(this.client);

        this.client.interceptors.request.use((config) => {
            if (config.url) {
                const separator = config.url.includes('?') ? '&' : '?';
                config.url = `${config.url}${separator}key=${this.apiKey}`;
            }
            return config;
        });

        this.client.interceptors.response.use((response: ApiResponse) => {
            return response;
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
