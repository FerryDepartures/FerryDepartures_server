//External Dependencies Import
import { Request, Response, Router } from 'express';

//Local Dependencies Import
import { getAllRoutes } from '../ferryRoutes';

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

export default router;
