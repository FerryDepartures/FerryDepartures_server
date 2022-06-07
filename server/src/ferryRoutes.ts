//External Dependencies Import
import axios from 'axios';

//Internal Dependencies Import
import iRoute from './interfaces/iRoute';

/**
 * @name getAllRoutes
 * @description Retrieves all routes from Trafikverket's API
 */
export async function getAllRoutes() {
    const request = await axios.post(
        'https://api.trafikinfo.trafikverket.se/v2/data.json',
        `<REQUEST>
			<LOGIN authenticationkey="96c58a7582f14b9b8f232e8bcf1b96e1"/>
			<QUERY runtime="true" objecttype="FerryRoute" schemaversion="1.2">
			</QUERY>
		</REQUEST>`,
        {
            headers: { 'Content-Type': 'text/plain' },
        },
    );
    const result = (await request.data)['RESPONSE']['RESULT'][0]['FerryRoute'];

    const filteredResult: iRoute[] = [];

    result.forEach((route: iRoute) =>
        filteredResult.push({
            Id: route.Id,
            Name: route.Name,
        }),
    );

    return filteredResult.sort((a: iRoute, b: iRoute) => a.Name.localeCompare(b.Name, 'sv'));
}

/**
 * @name getRoute
 * @description Retrieves all routes from Trafikverket's API
 */
export async function getRoute(name: string) {
    const routes = await getAllRoutes();
    const route = routes.find((route: iRoute) => route.Name.toLowerCase() === name.toLowerCase());

    return route;
}

/**
 * @name getDepartures
 * @description Retrieves departures from Trafikverket's API
 */
export async function getDepartures(routeId: string) {
    const date = new Date();
    const date24h = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    const request = await axios.post(
        'https://api.trafikinfo.trafikverket.se/v2/data.json',
        `
        <REQUEST>
            <LOGIN authenticationkey="96c58a7582f14b9b8f232e8bcf1b96e1" />
            <QUERY objecttype="FerryAnnouncement" schemaversion="1.2" orderby="DepartureTime">
                <FILTER>
                    <EQ name="Route.Id" value="${routeId}" />
                    <GT name="DepartureTime" value="${date.toISOString()}" />
                    <LT name="DepartureTime" value="${date24h.toISOString()}" />
                </FILTER>
            </QUERY>
        </REQUEST>
        `,
        {
            headers: { 'Content-Type': 'text/plain' },
        },
    );
    return (await request.data)['RESPONSE']['RESULT'][0]['FerryAnnouncement'];
}

/**
 * @name getDeparturesByName
 * @description Retrieves departures from Trafikverket's API
 */
export async function getDeparturesByName(routeName: string) {
    const date = new Date();
    const date24h = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    const request = await axios.post(
        'https://api.trafikinfo.trafikverket.se/v2/data.json',
        `
        <REQUEST>
            <LOGIN authenticationkey="96c58a7582f14b9b8f232e8bcf1b96e1" />
            <QUERY objecttype="FerryAnnouncement" schemaversion="1.2" orderby="DepartureTime">
                <FILTER>
                    <EQ name="Route.Name" value="${routeName}" />
                    <GT name="DepartureTime" value="${date.toISOString()}" />
                    <LT name="DepartureTime" value="${date24h.toISOString()}" />
                </FILTER>
            </QUERY>
        </REQUEST>
        `,
        {
            headers: { 'Content-Type': 'text/plain' },
        },
    );
    return (await request.data)['RESPONSE']['RESULT'][0]['FerryAnnouncement'];
}
