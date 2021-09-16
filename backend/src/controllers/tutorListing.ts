import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import tutorListingService from '../services/tutorListing';

const getTutorListings = async (ctx: Koa.Context): Promise<void> => {
  const tutorListings = await tutorListingService.getTutorListings(ctx.query);
  ctx.body = { data: tutorListings };
};

const getTutorListing = async (ctx: Koa.Context): Promise<void> => {
  const tutorListing = await tutorListingService.getTutorListing(ctx.params.id);

  if (!tutorListing) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: tutorListing };
};

const createTutorListing = async (ctx: Koa.Context): Promise<void> => {
  const tutorListing = ctx.request.body;
  const newTutorListing = await tutorListingService.createTutorListing({
    ...tutorListing,
    tutor: tutorListing.tutorId,
  });
  ctx.body = {
    data: newTutorListing,
  };
};

const updateTutorListing = async (ctx: Koa.Context): Promise<void> => {
  const savedTutorListing = await tutorListingService.updateTutorListing(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = {
    data: savedTutorListing,
  };
};

const deleteTutorListing = async (ctx: Koa.Context): Promise<void> => {
  await tutorListingService.deleteTutorListing(ctx.params.id);
  ctx.status = HttpStatus.OK;
  ctx.body = {};
};

export default {
  getTutorListings,
  getTutorListing,
  createTutorListing,
  updateTutorListing,
  deleteTutorListing,
};
