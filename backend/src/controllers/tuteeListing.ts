import Koa from 'koa';
import HttpStatus from 'http-status-codes';
import tuteeListingService from '../services/tuteeListing';

const getTuteeListings = async (ctx: Koa.Context): Promise<void> => {
  const tuteeListings = await tuteeListingService.getTuteeListings();
  ctx.body = { data: tuteeListings };
};

const getTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  const tuteeListing = await tuteeListingService.getTuteeListing(ctx.params.id);

  if (!tuteeListing) {
    ctx.throw(HttpStatus.NOT_FOUND);
  }
  ctx.body = { data: tuteeListing };
};

const createTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  // note that the type is "tutee: int"
  const newTuteeListing = await tuteeListingService.createTuteeListing(
    ctx.request.body
  );
  ctx.body = {
    data: newTuteeListing,
  };
};

const updateTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  const savedTuteeListing = await tuteeListingService.updateTuteeListing(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = {
    data: savedTuteeListing,
  };
};

const deleteTuteeListing = async (ctx: Koa.Context): Promise<void> => {
  await tuteeListingService.deleteTuteeListing(ctx.params.id);
  ctx.status = HttpStatus.OK;
};

export default {
  getTuteeListings,
  getTuteeListing,
  createTuteeListing,
  updateTuteeListing,
  deleteTuteeListing,
};
