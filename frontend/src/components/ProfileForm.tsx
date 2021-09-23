import React from 'react';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { Gender } from '../types/profile';

export interface ProfileData {
  name: string;
  gender: Gender;
  description: string;
}

interface Props {
  isLoading: boolean;
  errors: FieldErrors<ProfileData>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<ProfileData, object>;
}

const ProfileForm: React.FC<Props> = ({
  isLoading,
  errors,
  handleSubmit,
  control,
}) => (
  <form onSubmit={handleSubmit}>
    <IonItem
      fill="outline"
      lines="full"
      color={errors.name ? 'danger' : undefined}
      disabled={isLoading}
    >
      <IonLabel position="floating">Name</IonLabel>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <IonInput onIonChange={onChange} onIonBlur={onBlur} value={value} />
        )}
        rules={{
          required: 'Name is required',
        }}
      />
      {errors.name && (
        <IonNote slot="helper" color="danger">
          {errors.name.message}
        </IonNote>
      )}
    </IonItem>
    <IonItem
      fill="outline"
      lines="full"
      color={errors.gender ? 'danger' : undefined}
      disabled={isLoading}
    >
      <IonLabel position="floating">Gender</IonLabel>
      <Controller
        name="gender"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <IonSelect onIonChange={onChange} onIonBlur={onBlur} value={value}>
            {Object.values(Gender).map((gender) => (
              <IonSelectOption key={gender} value={gender}>
                {gender}
              </IonSelectOption>
            ))}
          </IonSelect>
        )}
        rules={{
          required: 'Gender is required',
        }}
      />
      {errors.gender && (
        <IonNote slot="helper" color="danger">
          {errors.gender.message}
        </IonNote>
      )}
    </IonItem>
    <IonItem
      fill="outline"
      lines="full"
      color={errors.description ? 'danger' : undefined}
      disabled={isLoading}
    >
      <IonLabel position="floating">Description</IonLabel>
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <IonTextarea
            onIonChange={onChange}
            onIonBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.description && (
        <IonNote slot="helper" color="danger">
          {errors.description.message}
        </IonNote>
      )}
    </IonItem>
    <IonButton
      className="ion-no-margin ion-margin-top"
      expand="block"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? <IonSpinner /> : 'Save'}
    </IonButton>
    <input type="submit" hidden />
  </form>
);

export default ProfileForm;
