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
import TuteeListingCard from './TuteeListingCard';
import {
  GetTuteeListingsQueryParams,
  useGetTuteeListingsQuery,
} from '../api/tutee';
import { ListingType, TuteeListing } from '../types/listing';
import {
  incrementTuteeListingPagination,
  resetTuteeListingPagination,
} from '../reducers/tuteeFilters';
import NoListings from './NoListings';

interface Props {
  filters: GetTuteeListingsQueryParams;
  owner: 'self' | 'other' | 'all';
  disableRefresh?: boolean;
  hideProfiles?: boolean;
}

const TuteeListings: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { filters, owner, disableRefresh, hideProfiles } = props;
  const { data, isFetching } = useGetTuteeListingsQuery(filters);
  const [listings, setListings] = useState<TuteeListing[]>([]);
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
        dispatch(resetTuteeListingPagination());
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchNext = ($event: CustomEvent<void>) => {
    setIsAppending(true);
    dispatch(incrementTuteeListingPagination());

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
    dispatch(resetTuteeListingPagination());

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
        <TuteeListingCard listing={listing} hideProfile={hideProfiles} />
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
    <NoListings listingType={ListingType.Tutee} owner={owner} />
  );
};

TuteeListings.defaultProps = {
  disableRefresh: false,
  hideProfiles: false,
};

export default TuteeListings;
