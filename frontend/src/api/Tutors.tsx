import { TutorListing, TutorListingDetails } from '../Interfaces';
import { SERVER, HEADERS } from '../Constants';

export const apiGetTutorListings = (): Promise<[TutorListing]> => {
  const url = `${SERVER}/api/tutors`;
  const options = {
    method: 'GET',
    headers: HEADERS,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res as [TutorListing]);
};

export const apiCreateTutorListing = (
  details: TutorListingDetails
): Promise<Response> => {
  const url = `${SERVER}/api/tutors`;
  const options = {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(details),
  };

  return fetch(url, options);
};

export const apiGetTutorListing = (id: number): Promise<TutorListing> => {
  const url = `${SERVER}/api/tutor/${id}`;
  const options = {
    method: 'GET',
    headers: HEADERS,
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res as TutorListing);
};

export const apiUpdateTutorListing = (
  id: number,
  details: TutorListingDetails
): Promise<TutorListing> => {
  const url = `${SERVER}/api/tutor/${id}`;
  const options = {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(details),
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((res) => res as TutorListing);
};

export const apiDeleteTutorListing = (id: number): Promise<Response> => {
  const url = `${SERVER}/api/tutor/${id}`;
  const options = {
    method: 'DELETE',
    headers: HEADERS,
  };

  return fetch(url, options);
};
