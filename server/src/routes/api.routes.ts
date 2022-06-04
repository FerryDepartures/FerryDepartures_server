//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { getAllRoutes, getDepartures } from '../ferryRoutes';

//Variable Declarations
const router = Router();

/**
 * @get/route: /api/routes
 * @desc: This route retrieves all routes from Trafikverket's API
 * @access: Public
 * @return: JSON
 */
router.get('/routes', async (req: Request, res: Response) => {
    res.json({
        routes: await getAllRoutes(),
        error: '',
        status: 'success',
    });
});

/**
 * @get/route: /api/route/:routeID
 * @desc: This route retrieves all departues  from Trafikverket's API
 * @access: Public
 * @return: JSON
 */
router.get('/route/:routeID', async (req: Request, res: Response) => {
    if (!req.params.routeID) {
        return res.json({
            departures: '',
            error: 'Missing routeID',
            status: 'error',
        });
    }

    try {
        const departures = await getDepartures(req.params.routeID);

        if (departures.length <= 0) {
            return res.status(404).json({
                departures: [],
                error: 'No departures found',
                status: 'error',
            });
        }

        res.json({
            routes: departures,
            error: '',
            status: 'success',
        });
    } catch {
        res.status(400).json({
            error: 'Invalid routeID',
            status: 'error',
        });
    }
});

/**
 * @get/route: /api/*
 * @desc: Catch all route
 * @access: Public
 * @return: JSON
 */
router.get('*', (req: Request, res: Response) => {
    res.status(404).json({
        error: 'Route not found',
        status: 'error',
    });
});

export default router;
