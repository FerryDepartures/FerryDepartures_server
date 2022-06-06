[Go back](./README.md)

# Get all depatures

Returns all depatures for a specific route.

**URL** : `/api/routes/:routeID`

**Method** : `GET`

**Parameters**

    - `routeID`: The ID of the route.

The parameter is required.

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
	"success": true,
	"error": "",
	"depatures": []
}
```

All depatures are returned in the `depatures` key.

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
