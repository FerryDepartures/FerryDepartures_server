# Ferry Depatures API Documentation

## Base URL

The base URL for the API is `TBD`.
All endpoints are relative to this base URL.

## Default Endpoint Response

All endpoints return a JSON response with the following structure:

```json
{
	"success": true,
	"error": "",
	"data": ["DATA_TO_BE_RETURNED"]
}
```

Here, _`success`_ is either `true` or `false`.
<br>
If _`success`_ is `true`, `error` is empty and the request was successful. Data is returned in `data`.
<br>
If _`success`_ is `false`, `error` contains the error message. Data is not returned.

**_Note:_** The data returned is not guaranteed to be returned with the key `data`. Check the endpoint documentation for more information.

## Endpoints

-   [Get Routes](routes.md) : `GET /api/routes/`
-   [Get Depatures](depatures.md) : `GET /api/route/:routeID/`
