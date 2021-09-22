import React from 'react';
import ReactGA from 'react-ga';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useAppDispatch } from '../../app/hooks';
import { useAddProfileMutation } from '../../api/profile';
import { setProfileId, setToken } from '../../reducers/auth';
import type { ErrorResponse } from '../../types/error';

import ProfileForm, { ProfileData } from '../../components/ProfileForm';
import { EventCategory, ProfileEventAction } from '../../app/analytics';

const CreateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [addProfile, { isLoading }] = useAddProfileMutation();

  const router = useIonRouter();
  const [present] = useIonToast();
  const {
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm<ProfileData>();

  const onSubmit = async (data: ProfileData) => {
    if (window.navigator.onLine) {
      try {
        const profile = await addProfile(data).unwrap();
        ReactGA.event({
          category: EventCategory.Profile,
          action: ProfileEventAction.Create,
        });
        if (profile.profileId && profile.token) {
          dispatch(setProfileId(profile.profileId));
          dispatch(setToken(profile.token));
        }

        router.push('/tutors');
      } catch (error) {
        const { errors: errorMessages } = (error as FetchBaseQueryError)
          .data as ErrorResponse;

        for (const errorMessage of errorMessages) {
          switch (errorMessage.field) {
            case 'name':
              setError('name', {
                message: errorMessage.detail.join(', '),
              });
              break;
            case 'gender':
              setError('gender', {
                message: errorMessage.detail.join(', '),
              });
              break;
            case 'description':
              setError('description', {
                message: errorMessage.detail.join(', '),
              });
              break;
            default:
              break;
          }
        }
      }
    } else {
      present({
        message: 'No internet connection',
        color: 'danger',
        duration: 2000,
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <ProfileForm
          isLoading={isLoading}
          errors={errors}
          handleSubmit={handleSubmit(onSubmit)}
          control={control}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
