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

    async setListing(params: {
        locationAlias: string;
        inventoryTypeID: number;
        priceAmountInSmallestUnit: number;
        currencyCode: string;
        firstName: string;
        lastName: string;
        emailAddress: string;
        phoneNumber: string;
        locationCategoryFieldIDValueList: Record<string, any>[];
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_listing`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setSubscribeToCityAreaPriorityBids(params: {
        citySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_subscribe_to_city_area_priority_bids`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setSubscribeToLocationPriorityBids(params: {
        locationAlias: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_subscribe_to_location_priority_bids`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setUnlockExactListingTimes(params: {
        locationAlias: string;
        date: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_unlock_exact_listing_times`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setUnsubscribeToCityAreaPriorityBids(params: {
        citySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_unsubscribe_to_city_area_priority_bids`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setUnsubscribeToLocationPriorityBids(params: {
        locationAlias: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_unsubscribe_to_location_priority_bids`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class ListingApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'listing/';
    }

    async getCompetingListings(params: {
        listingID: string;
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

    async setArchive(params: {
        listingUUID: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_archive`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setCancelBid(params: {
        bidID: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_cancel_bid`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setCreateFromTemplate(params: {
        templateListingID: string;
        publishListing?: boolean;
        bidID?: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_create_from_template`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setFillBid(params: {
        listingID: string;
        bidID: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_fill_bid`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setMarketVisibility(params: {
        listingID: string;
        publishListing: boolean;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_market_visibility`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    async setPrice(params: {
        listingID: string;
        priceAmountInSmallestUnit: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_price`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
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

    // set_bid
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
        let url = `${this.baseUrl}set_bid`;
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
    // TODO

    // set_achievement_bonus
    async setAchievementBonus(params: {
        slug: string;
        achievementName: string;
        achievementDescription: string;
        unicodeIcon: string;
        value: string;
        displayOrderDescending?: number;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_achievement_bonus`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
    // set_create_medal
    async setCreateMedal(params: {
        medalCategorySlug: string;
        slug: string;
        name: string;
        previousMedalSlug?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_create_medal`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_delete_achievement_bonus
    async setDeleteAchievementBonus(params: {
        achievementBonusID: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_delete_achievement_bonus`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_edit_medal
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
        let url = `${this.baseUrl}set_edit_medal`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_link_permission
    async setLinkPermission(params: {
        slug: string;
        permissionName: string;
        settingPayload?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_link_permission`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_link_requirement
    async setLinkRequirement(params: {
        slug: string;
        requirementSlug: string;
        value: string;
        requirementLimitType?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_link_requirement`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_request_medal_sponsorship
    async setRequestMedalSponsorship(params: {
        sponsorUserAlias: string;
        medalCategorySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_request_medal_sponsorship`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_sponsor_user
    async setSponsorUser(params: {
        userAlias: string;
        medalCategorySlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_sponsor_user`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_unlink_permission
    async setUnlinkPermission(params: {
        slug: string;
        permissionName: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_unlink_permission`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_unlink_requirement
    async setUnlinkRequirement(params: {
        slug: string;
        requirementSlug: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_unlink_requirement`;
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

    async setReferredUser(params: {
        userAlias: string;
        referredUserAlias: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_referred_user`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }
}

class NotificationApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'notification/';
    }

    async setReadstate(params: {
        commaSeperatedNotificationIDList: string;
        readState: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_readstate`;
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

class CommunityApi {
    client: AxiosInstance;
    baseUrl: string;

    constructor(client: AxiosInstance) {
        this.client = client;
        this.baseUrl = 'community/';
    }

    // set_create_poll_answer_for_question
    async setCreatePollAnswerForQuestion(params: {
        questionID: string;
        answerTitle: string;
        answerDescription?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_create_poll_answer_for_question`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_create_poll_question_for_post
    async setCreatePollQuestionForPost(params: {
        postID: string;
        questionName: string;
        questionDescription?: string;
        unicodeIcon: string;
        endDateTime?: string;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_create_poll_question_for_post`;
        if (params) {
            url = appendQueryParams(url, params);
        }
        return await this.client.get(url);
    }

    // set_submit_vote_for_question
    async setSubmitVoteForQuestion(params: {
        questionID: number;
        selectedAnswerID: number;
        isWritingRequest?: boolean;
        explain?: boolean;
    }) {
        let url = `${this.baseUrl}set_submit_vote_for_question`;
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
    medal: MedalApi;
    user: UserApi;
    notification: NotificationApi;
    tools: ToolsApi;
    community: CommunityApi;

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
