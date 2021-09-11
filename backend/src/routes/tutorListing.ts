import Router from 'koa-router';
import tutorListingController from '../controllers/tutorListing';

const router: Router = new Router();

router.get('/', tutorListingController.getTutorListings);

router.get('/:id', tutorListingController.getTutorListing);

router.post('/', tutorListingController.createTutorListing);

router.put('/:id', tutorListingController.updateTutorListing);

router.delete('/:id', tutorListingController.deleteTutorListing);

export default router;
