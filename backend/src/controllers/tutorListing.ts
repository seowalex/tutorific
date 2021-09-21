import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import tutorListingService from '../services/tutorListing';

const getTutorListings = async (ctx: Koa.Context): Promise<void> => {
  const [tutorListings, count] = await tutorListingService.getTutorListings(
    ctx.query
  );
  ctx.body = { data: { listings: tutorListings, count } };
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

  const { profileId } = ctx.state.user;
  if (profileId !== tutorListing.tutorId) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const newTutorListing = await tutorListingService.createTutorListing({
    ...tutorListing,
    tutor: tutorListing.tutorId,
  });
  ctx.body = {
    data: newTutorListing,
  };
};

const updateTutorListing = async (ctx: Koa.Context): Promise<void> => {
  const tutorListing = ctx.request.body;

  const { profileId } = ctx.state.user;
  if (profileId !== tutorListing.tutorId) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const savedTutorListing = await tutorListingService.updateTutorListing(
    ctx.params.id,
    tutorListing
  );
  ctx.body = {
    data: savedTutorListing,
  };
};

const deleteTutorListing = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;
  const tutorListingId = ctx.params.id;
  const tutorListing = await tutorListingService.getTutorListing(
    tutorListingId
  );

  if (!tutorListing) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  if (profileId !== tutorListing.tutor.id) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  await tutorListingService.deleteTutorListing(tutorListingId);
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
