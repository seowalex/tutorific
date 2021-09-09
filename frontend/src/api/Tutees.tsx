import { TuteeListing, TuteeListingDetails } from '../Interfaces';
import { SERVER } from '../Constants';

const headers = {
  'Content-Type': 'application/json',
};

export const apiGetTuteeListings = (): Promise<[TuteeListing]> => {
  const url = `${SERVER}/api/tutees`;
  const options = {
    method: 'GET',
    headers,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res as [TuteeListing]);
};

export const apiCreateTuteeListing = (
  details: TuteeListingDetails
): Promise<Response> => {
  const url = `${SERVER}/api/tutees`;
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(details),
  };

  return fetch(url, options);
};

export const apiGetTuteeListing = (id: number): Promise<TuteeListing> => {
  const url = `${SERVER}/api/tutee/${id}`;
  const options = {
    method: 'GET',
    headers,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res as TuteeListing);
};

export const apiUpdateTuteeListing = (
  id: number,
  details: TuteeListingDetails
): Promise<TuteeListing> => {
  const url = `${SERVER}/api/tutee/${id}`;
  const options = {
    method: 'PUT',
    headers,
    body: JSON.stringify(details),
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res as TuteeListing);
};

export const apiDeleteTuteeListing = (id: number): Promise<Response> => {
  const url = `${SERVER}/api/tutee/${id}`;
  const options = {
    method: 'DELETE',
    headers,
  };

  return fetch(url, options);
};
