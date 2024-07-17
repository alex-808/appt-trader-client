import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import dotenv from 'dotenv';
import { request } from 'http';

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
    Payload?:
        | {
              Name: string;
              MetaInformation: any;
              KeyValueList: [];
          }
        | boolean;
}

class ApiError extends Error {
    constructor(
        readonly message: string,
        readonly statusCode?: number,
        readonly data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

class BaseApi {
    constructor(protected client: AxiosInstance, protected baseUrl: string) {
        this.client = client;
        this.baseUrl = baseUrl;
    }

    appendQueryParams(url: string, params: Record<string, any> | undefined) {
        if (!params) return url;
        const { explain, ...restParams } = params;

        const queryParams: Record<string, any> = {};
        for (const [key, value] of Object.entries(restParams)) {
            queryParams[key] =
                typeof value === 'object' ? JSON.stringify(value) : value;
        }

        if (explain) {
            queryParams['explain'] = explain;
        }

        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}${new URLSearchParams(
            queryParams
        ).toString()}`;
    }

    executeRequest(url: string, params?: Record<string, any>) {
        const requestUrl = this.appendQueryParams(url, params);
        return this.client.get<ApiData>(requestUrl);
    }
}

class MarketDataApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/marketdata');
    }

    async getHighestConvertingLocations(params?: {
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}/get_highest_converting_locations`;
        return await this.executeRequest(url, params);
    }

    async getMostBidsLeastAsks(params?: {
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_most_bids_least_asks`,
            params
        );
    }
    async getMostUnderservedLocations(params?: {
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_most_underserved_locations`,
            params
        );
    }
    async getMostViewedLocationsWithLeastListings(params?: {
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_most_viewed_locations_with_least_listings`,
            params
        );
    }
    async getToplist(params?: {
        cityCode?: string;
        categorySlug?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(`${this.baseUrl}/get_toplist`, params);
    }
}

class AccountApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/account');
    }

    async getList(params?: {
        searchFilter?: string;
        includeDepositAccount?: boolean;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/get_list`, params);
    }
}

class LocationApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/location');
    }

    async getCategory(params: { locationAlias: string; explain?: boolean }) {
        return this.executeRequest(`${this.baseUrl}/get_category`, params);
    }
    async getComparableTrades(params: {
        locationAlias: string;
        dateTime: string;
        inventoryTypeID: number;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/get_comparable_trades`,
            params
        );
    }

    async getInventoryTypes(params: {
        locationAlias: string;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/get_inventory_types`,
            params
        );
    }

    async getMetricHistory(params: {
        locationAlias: string;
        metricList?: string;
        interval?: string;
        dateRangeStart: string;
        dateRangeEnd: string;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/get_metric_history`,
            params
        );
    }

    async getMetrics(params: {
        locationAlias: string;
        dateRangeStart: string;
        dateRangeEnd: string;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/get_metrics`, params);
    }

    async setListing(params: {
        locationAlias: string;
        inventoryTypeID: number;
        priceAmountInSmallestUnit: number;
        currencyCode: string;
        dateTime: string;
        firstName: string;
        lastName: string;
        emailAddress: string;
        phoneNumber: string;
        locationCategoryFieldIDValueList: Record<string, any>[];
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/set_listing`, params);
    }

    async setSubscribeToCityAreaPriorityBids(params: {
        citySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/set_subscribe_to_city_area_priority_bids`,
            params
        );
    }

    async setSubscribeToLocationPriorityBids(params: {
        locationAlias: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/set_subscribe_to_location_priority_bids`,
            params
        );
    }

    async setUnlockExactListingTimes(params: {
        locationAlias: string;
        date: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/set_unlock_exact_listing_times`,
            params
        );
    }

    async setUnsubscribeToCityAreaPriorityBids(params?: {
        citySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        const url = `${this.baseUrl}/set_unsubscribe_to_city_area_priority_bids`;
        return await this.executeRequest(url, params);
    }

    async setUnsubscribeToLocationPriorityBids(params?: {
        locationAlias: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        const url = `${this.baseUrl}/set_unsubscribe_to_location_priority_bids`;
        return await this.executeRequest(url, params);
    }
}

class ListingApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/listing');
    }

    async getCompetingListings(params: {
        listingID: string;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/get_competing_listings`,
            params
        );
    }

    async getPorfolioListings(params?: {
        getPopularityScoreBracket?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/get_portfolio_listings`,
            params
        );
    }

    async setArchive(params: {
        listingUUID: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/set_archive`, params);
    }

    async setCancelBid(params: {
        bidID: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/set_cancel_bid`, params);
    }

    async setCreateFromTemplate(params: {
        templateListingID: string;
        publishListing?: boolean;
        bidID?: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/set_create_from_template`,
            params
        );
    }

    async setFillBid(params: {
        listingID: string;
        bidID: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/set_fill_bid`, params);
    }

    async setMarketVisibility(params: {
        listingID: string;
        publishListing: boolean;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/set_market_visibility`,
            params
        );
    }

    async setPrice(params: {
        listingID: string;
        priceAmountInSmallestUnit: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/set_price`, params);
    }
}

class PortfolioApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/portfolio');
    }

    async getValidLocationIdentifiers(params?: {
        searchFilter?: string;
        pageSize?: number;
        pageNumber?: number;
    }) {
        return this.executeRequest(
            `${this.baseUrl}/get_valid_location_identifiers`,
            params
        );
    }

    async setBid(params: {
        locationIdentifier: string;
        inventoryTypeDesignator: string;
        popularityScoreBracketRangeOrTimeRange: string;
        noticeOrDateRange: string;
        minimumUnitPriceUSD: string;
        maximumUnitPriceUSD: string;
        fundingAccountID: string;
        salesProceedsAccountID: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return this.executeRequest(`${this.baseUrl}/set_bid`, params);
    }
}

class BidApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/bid');
    }

    async getList(params?: { pageSize?: number; pageNumber?: number }) {
        return this.executeRequest(`${this.baseUrl}/get_list`, params);
    }
}

class MedalApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/medal');
    }

    async getAchievementBonusTypes(params?: {
        searchFilter?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_achievement_bonus_types`,
            params
        );
    }

    async getAvailableMedalCategories(params?: {
        searchFilter?: string;
        restrictToSponsorableByUserAlias?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_available_medal_categories`,
            params
        );
    }

    async getAvailableMedals(params: {
        medalCategorySlug: string;
        searchFilter?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_available_medals`,
            params
        );
    }

    async getAvailablePermissions(params?: {
        searchFilter?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_available_permissions`,
            params
        );
    }

    async getAvailableRequirements(params?: {
        searchFilter?: string;
        filterBy?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_available_requirements`,
            params
        );
    }

    async setAchievementBonus(params: {
        slug: string;
        achievementName: string;
        achievementDescription: string;
        unicodeIcon: string;
        value: string;
        displayOrderDescending?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_achievement_bonus`,
            params
        );
    }

    async setCreateMedal(params: {
        medalCategorySlug: string;
        slug: string;
        name: string;
        previousMedalSlug?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_create_medal`,
            params
        );
    }

    async setDeleteAchievementBonus(params: {
        achievementBonusID: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_delete_achievement_bonus`,
            params
        );
    }

    async setEditMedal(params: {
        slug: string;
        name: string;
        description: string;
        iconURL?: string;
        color?: string;
        textColor?: string;
        nextMedalSlug?: string;
        medalCategorySlug?: string;
        importance?: number;
        newSlug?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_edit_medal`,
            params
        );
    }

    async setLinkPermission(params: {
        slug: string;
        permissionName: string;
        settingPayload?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_link_permission`,
            params
        );
    }

    async setLinkRequirement(params: {
        slug: string;
        requirementSlug: string;
        value: string;
        requirementLimitType?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_link_requirement`,
            params
        );
    }

    async setRequestMedalSponsorship(params: {
        sponsorUserAlias: string;
        medalCategorySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_request_medal_sponsorship`,
            params
        );
    }

    async setSponsorUser(params: {
        userAlias: string;
        medalCategorySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_sponsor_user`,
            params
        );
    }

    async setUnlinkPermission(params: {
        slug: string;
        permissionName: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_unlink_permission`,
            params
        );
    }

    async setUnlinkRequirement(params: {
        slug: string;
        requirementSlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_unlink_requirement`,
            params
        );
    }
}

class UserApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/user');
    }

    async get(params?: {
        searchFilter?: string;
        pageSize?: number;
        pageNumber?: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(`${this.baseUrl}/get`, params);
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
        return await this.executeRequest(
            `${this.baseUrl}/get_transaction_history`,
            params
        );
    }

    async setReferredUser(params: {
        userAlias: string;
        referredUserAlias: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_referred_user`,
            params
        );
    }
}

class NotificationApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/notification');
    }

    async setReadstate(params: {
        commaSeperatedNotificationIDList: string;
        readState: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_readstate`,
            params
        );
    }
}

class ToolsApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/tools');
    }

    async getConvertCurrency(params: {
        currencyAmountInSmallestPossibleUnit: number;
        sourceCurrencyCode: string;
        destinationCurrencyCode: number;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_convert_currency`,
            params
        );
    }

    async getGeoipData(params: { ipAddress: string; explain?: boolean }) {
        return await this.executeRequest(
            `${this.baseUrl}/get_geoip_data`,
            params
        );
    }
}

class CommunityApi extends BaseApi {
    constructor(client: AxiosInstance) {
        super(client, '/v1/community');
    }

    async setCreatePollAnswerForQuestion(params: {
        questionID: string;
        answerTitle: string;
        answerDescription?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_create_poll_answer_for_question`,
            params
        );
    }

    async setCreatePollQuestionForPost(params: {
        postID: string;
        questionName: string;
        questionDescription?: string;
        unicodeIcon: string;
        endDateTime?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_create_poll_question_for_post`,
            params
        );
    }

    async setSubmitVoteForQuestion(params: {
        questionID: number;
        selectedAnswerID: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        return await this.executeRequest(
            `${this.baseUrl}/set_submit_vote_for_question`,
            params
        );
    }
}

export class ApiClient {
    private client: AxiosInstance;
    private apiKey: string;
    readonly marketData: MarketDataApi;
    readonly account: AccountApi;
    readonly location: LocationApi;
    readonly listing: ListingApi;
    readonly porfolio: PortfolioApi;
    readonly bid: BidApi;
    readonly medal: MedalApi;
    readonly user: UserApi;
    readonly notification: NotificationApi;
    readonly tools: ToolsApi;
    readonly community: CommunityApi;

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
        this.medal = new MedalApi(this.client);
        this.user = new UserApi(this.client);
        this.notification = new NotificationApi(this.client);
        this.tools = new ToolsApi(this.client);
        this.community = new CommunityApi(this.client);

        // Append API key to all requests
        this.client.interceptors.request.use((config) => {
            if (config.url) {
                const separator = config.url.includes('?') ? '&' : '?';
                config.url = `${config.url}${separator}key=${this.apiKey}`;
            }
            return config;
        });

        this.client.interceptors.response.use(
            (response) => {
                // Handle API-specific errors
                if (response.data.ResponseCode !== 100) {
                    throw new ApiError(
                        JSON.stringify(response.data.ResponseMessage),
                        response.data.ResponseCode,
                        response.data
                    );
                }
                return response.data;
            },
            (error: AxiosError<ApiData>) => {
                // Handle network and HTTP errors
                if (error.response) {
                    // HTTP error response
                    throw new ApiError(
                        JSON.stringify(
                            error.response.data?.ResponseMessage ||
                                error.message
                        ),
                        error.response.status,
                        error.response.data
                    );
                } else if (error.request) {
                    // Network error
                    throw new ApiError(
                        'Network Error',
                        undefined,
                        error.request
                    );
                } else {
                    // Other errors
                    throw new ApiError(error.message);
                }
            }
        );
    }

    get clientInstance() {
        return this.client;
    }
}
