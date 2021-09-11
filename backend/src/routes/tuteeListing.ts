import Router from 'koa-router';
import tuteeListingController from '../controllers/tuteeListing';

const router: Router = new Router();

router.get('/', tuteeListingController.getTuteeListings);

router.get('/:id', tuteeListingController.getTuteeListing);

router.post('/', tuteeListingController.createTuteeListing);

router.put('/:id', tuteeListingController.updateTuteeListing);

router.delete('/:id', tuteeListingController.deleteTuteeListing);

export default router;
