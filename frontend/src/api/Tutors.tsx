import { TutorListing, TutorListingDetails } from '../Interfaces';
import { SERVER } from '../Constants';

const headers = {
  'Content-Type': 'application/json',
};

export const apiGetTutorListings = (): Promise<[TutorListing]> => {
  const url = `${SERVER}/api/tutors`;
  const options = {
    method: 'GET',
    headers,
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
    headers,
    body: JSON.stringify(details),
  };

  return fetch(url, options);
};

export const apiGetTutorListing = (id: number): Promise<TutorListing> => {
  const url = `${SERVER}/api/tutor/${id}`;
  const options = {
    method: 'GET',
    headers,
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
    headers,
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
    headers,
  };

  return fetch(url, options);
};
