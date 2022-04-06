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

    result.forEach((route: iRoute) => {
        const obj = {
            Id: route.Id,
            Name: route.Name,
        };
        filteredResult.push(obj);
    });

    return filteredResult;
}
