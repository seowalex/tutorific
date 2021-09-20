import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import tuteeListingService from '../services/tuteeListing';

const getTuteeListings = async (ctx: Koa.Context): Promise<void> => {
  const [tuteeListings, count] = await tuteeListingService.getTuteeListings(
    ctx.query
  );
  ctx.body = { data: { listings: tuteeListings, count } };
};

const getTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  const tuteeListing = await tuteeListingService.getTuteeListing(ctx.params.id);

  if (!tuteeListing) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: tuteeListing };
};

const createTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  const tuteeListing = ctx.request.body;

  const { profileId } = ctx.state.user;
  if (profileId !== tuteeListing.tuteeId) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const newTuteeListing = await tuteeListingService.createTuteeListing({
    ...tuteeListing,
    tutee: tuteeListing.tuteeId,
  });
  ctx.body = {
    data: newTuteeListing,
  };
};

const updateTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  const tuteeListing = ctx.request.body;

  const { profileId } = ctx.state.user;
  if (profileId !== tuteeListing.tuteeId) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  const savedTuteeListing = await tuteeListingService.updateTuteeListing(
    ctx.params.id,
    tuteeListing
  );
  ctx.body = {
    data: savedTuteeListing,
  };
};

const deleteTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  const { profileId } = ctx.state.user;
  const tuteeListing = await tuteeListingService.getTuteeListing(ctx.params.id);

  if (!tuteeListing) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }

  if (profileId !== tuteeListing.tutee.id) {
    ctx.throw(HttpStatus.UNAUTHORIZED);
  }

  await tuteeListingService.deleteTuteeListing(ctx.params.id);
  ctx.status = HttpStatus.OK;
  ctx.body = {};
};

export default {
  getTuteeListings,
  getTuteeListing,
  createTuteeListing,
  updateTuteeListing,
  deleteTuteeListing,
};
