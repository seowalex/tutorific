import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RefresherEventDetail } from '@ionic/core';

import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  useIonToast,
} from '@ionic/react';
import TutorListingCard from './TutorListingCard';
import {
  GetTutorListingsQueryParams,
  useGetTutorListingsQuery,
} from '../api/tutor';
import { ListingType, TutorListing } from '../types/listing';
import {
  incrementTutorListingPagination,
  resetTutorListingPagination,
} from '../reducers/tutorFilters';
import NoListings from './NoListings';

interface Props {
  filters: GetTutorListingsQueryParams;
  owner: 'self' | 'other' | 'all';
  disableRefresh?: boolean;
  hideProfiles?: boolean;
}

const TutorListings: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { filters, owner, disableRefresh, hideProfiles } = props;
  const { data, isFetching } = useGetTutorListingsQuery(filters);
  const [listings, setListings] = useState<TutorListing[]>([]);
  const [isAppending, setIsAppending] = useState<boolean>(false);
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const [present] = useIonToast();

  useEffect(() => {
    if (isAppending) {
      setListings([...listings, ...(data?.listings ?? [])]);
      setDisableInfiniteScroll(data ? data.listings.length < 10 : false);
      setIsAppending(false);
    } else {
      setListings(data?.listings ?? []);
      setDisableInfiniteScroll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(
    () =>
      window.navigator.serviceWorker.addEventListener('message', () => {
        setIsAppending(false);
        dispatch(resetTutorListingPagination());
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchNext = ($event: CustomEvent<void>) => {
    setIsAppending(true);
    dispatch(incrementTutorListingPagination());

    if (!window.navigator.onLine) {
      present({
        message: 'No internet connection',
        color: 'danger',
        duration: 2000,
      });
    }

    setTimeout(() => {
      ($event.target as HTMLIonInfiniteScrollElement).complete();
    }, 1000);
  };

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setIsAppending(false);
    dispatch(resetTutorListingPagination());

    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  return isFetching || listings.length > 0 ? (
    <>
      {!disableRefresh && (
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent refreshingText="Refreshing listings..." />
        </IonRefresher>
      )}
      {listings.map((listing) => (
        <TutorListingCard
          listing={listing}
          hideProfile={hideProfiles}
          key={listing.id}
        />
      ))}
      <IonInfiniteScroll
        threshold="100px"
        onIonInfinite={fetchNext}
        disabled={disableInfiniteScroll}
      >
        <IonInfiniteScrollContent loadingText="Loading listings..." />
      </IonInfiniteScroll>
    </>
  ) : (
    <NoListings listingType={ListingType.Tutor} owner={owner} />
  );
};

TutorListings.defaultProps = {
  disableRefresh: false,
  hideProfiles: false,
};

export default TutorListings;
