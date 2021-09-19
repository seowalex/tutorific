import React, { useState } from 'react';
import { RefresherEventDetail } from '@ionic/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { addOutline, funnel, funnelOutline } from 'ionicons/icons';
import { useDispatch } from 'react-redux';

import TuteeListingCard from '../../components/TuteeListingCard';
import { useGetTuteeListingsQuery } from '../../api/tutee';
import { useAppSelector } from '../../app/hooks';
import {
  incrementTuteeListingPagination,
  resetTuteeListingPagination,
  selectTuteeFilters,
  TuteeFiltersState,
} from '../../reducers/tuteeFilters';
import { TuteeListing } from '../../app/types';

const Tutees: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useAppSelector(selectTuteeFilters);
  const { data } = useGetTuteeListingsQuery(filters);
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false);
  const [listings, setListings] = useState<TuteeListing[]>([]);
  const [isAppending, setIsAppending] = useState<boolean>(false);

  const areFiltersEmpty = (filtersState: TuteeFiltersState): boolean =>
    filtersState.priceMin == null &&
    filtersState.priceMax == null &&
    (filtersState.subjects == null || filtersState.subjects.length === 0) &&
    (filtersState.levels == null || filtersState.levels.length === 0) &&
    (filtersState.timeSlots == null || filtersState.timeSlots.length === 0) &&
    (filtersState.locations == null || filtersState.locations.length === 0) &&
    !filtersState.gender;

  React.useEffect(() => {
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

  const fetchNext = ($event: CustomEvent<void>) => {
    setIsAppending(true);
    dispatch(incrementTuteeListingPagination());

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutee Listings</IonTitle>
          <IonButtons slot="primary" collapse>
            <IonButton routerLink="/tutee/add">
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
            <IonButton routerLink="/tutee/search">
              <IonIcon
                slot="icon-only"
                icon={areFiltersEmpty(filters) ? funnelOutline : funnel}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent refreshingText="Refreshing listings..." />
        </IonRefresher>
        {listings?.map((listing) => (
          <TuteeListingCard listing={listing} />
        ))}
        <IonInfiniteScroll
          threshold="100px"
          onIonInfinite={fetchNext}
          disabled={disableInfiniteScroll}
        >
          <IonInfiniteScrollContent loadingText="Loading listings..." />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Tutees;
