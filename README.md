# appt-trader-client

This is a client for interacting with the Appointment Trader API. Methods are available for each endpoint with typing for parameters.

You will need API keys for either the sandbox or production API which can be passed as a parameter during client initialization along with the base url (ex: https://rc.appointmenttrader.com for the sandbox API as of writing this):

```
const sandboxClient = new ApiClient({
        baseUrl: sandbox_url,
        apiKey: your_sandbox_api_key,
});
```

Note: If no baseUrl is passed the sandbox url will be used by default.

From here you can access each basepath (`/user`, `/medals`, etc) by accessing the respective property on the client and then the method for the respective endpoint.

For example to access the `/marketdata` `get_highest_converting_locations` endpoint can be accessed with:

```
sandboxClient.marketdata.getHighestConvertingLocations();
```

Parameters for endpoints are always a single object with property names matching those of the API:

```
await sandboxClient.location.getCategory({
    locationAlias: 'sexy-fish-miami',
});
```

Currently all endpoints are configured to be accessed via a GET request.

Note: All endpoints have an optional 'explain' parameter. Set to `true` it will return documentation for that endpoint.

Any feedback or bug reports are appreciated. I will do my best to maintain this package and keep it up to date as the API changes.
