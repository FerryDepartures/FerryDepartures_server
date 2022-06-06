[Go back](./README.md)

# Get all routes

Returns all ferry routes operated by the Swedish Färjerederiet (Trafikverket).

**URL** : `/api/routes/`

**Method** : `GET`

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"routes": [
		{
			"Id": "30",
			"Name": "Kornhallsleden"
		}
	]
}
```

All routes are returned in the `routes` key.

## Error Response

### Unknown error.

**Code** : `500 Internal Server Error`

**Content** :

```json
{
	"success": false,
	"error": ""
}
```

**_Note:_** The error message is not specified in the documentation.
