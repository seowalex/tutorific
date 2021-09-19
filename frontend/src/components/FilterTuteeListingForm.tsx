import React from 'react';
import {
  IonButton,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
} from '@ionic/react';
import {
  Controller,
  NestedValue,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Gender, Level, Subject, Town, WeekDay } from '../app/types';
import { TuteeFiltersState } from '../reducers/tuteeFilters';

import styles from './ListingForm.module.scss';

export interface FilterTuteeListingFormData {
  priceMin?: number;
  priceMax?: number;
  timeSlots?: NestedValue<number[]>;
  subjects?: NestedValue<string[]>;
  levels?: NestedValue<Level[]>;
  locations?: NestedValue<Town[]>;
  gender?: Gender;
}

interface Props {
  onSubmit: SubmitHandler<FilterTuteeListingFormData>;
  submitButtonText?: string;
  currentData?: TuteeFiltersState;
}

const FilterTuteeListingForm: React.FC<Props> = (props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  const emptyFilters = {
    priceMin: undefined,
    priceMax: undefined,
    timeSlots: [],
    subjects: [],
    levels: [],
    locations: [],
    gender: undefined,
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    getValues,
  } = useForm<FilterTuteeListingFormData>({
    defaultValues: currentData ?? emptyFilters,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <IonRow className={styles.priceInputsRow}>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.priceMin ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Min Price</IonLabel>
            <Controller
              name="priceMin"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  type="number"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                />
              )}
              rules={{
                min: {
                  value: 0,
                  message: 'Min Price must be positive',
                },
              }}
            />
            {errors.priceMin && (
              <IonNote slot="helper" color="danger">
                {errors.priceMin.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.priceMax ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Max Price</IonLabel>
            <Controller
              name="priceMax"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonInput
                  type="number"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                />
              )}
              rules={{
                min: {
                  value: 0,
                  message: 'Max Price must be positive',
                },
                validate: {
                  atLeastMin: (value) => {
                    const priceMin = getValues('priceMin')!;
                    return (
                      value == null ||
                      priceMin == null ||
                      Number.isNaN(value) ||
                      Number.isNaN(priceMin) ||
                      priceMin <= value ||
                      'Max Price must be at least Min Price'
                    );
                  },
                },
              }}
            />
            {errors.priceMax && (
              <IonNote slot="helper" color="danger">
                {errors.priceMax.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Subjects</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('subjects')}
            >
              {Object.keys(Subject).map((key) => (
                <IonSelectOption value={key}>
                  {Object(Subject)[key]}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Education Levels</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('levels')}
            >
              {Object.values(Level).map((value) => (
                <IonSelectOption value={value}>{value}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Available Days</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('timeSlots')}
            >
              {Object.keys(WeekDay).map((key, index) => (
                <IonSelectOption value={index * 48}>{key}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Locations</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('locations')}
            >
              {Object.values(Town).map((value) => (
                <IonSelectOption value={value}>{value}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Gender</IonLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonSelect
                  cancelText="Cancel"
                  okText="OK"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                >
                  {Object.values(Gender).map((gender) =>
                    gender === Gender.PNTS ? (
                      <IonSelectOption value={null}>
                        No Preference
                      </IonSelectOption>
                    ) : (
                      <IonSelectOption value={gender}>{gender}</IonSelectOption>
                    )
                  )}
                </IonSelect>
              )}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonButton expand="block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <IonSpinner /> : submitButtonText}
      </IonButton>
      <IonButton
        expand="block"
        type="button"
        disabled={isSubmitting}
        fill="outline"
        onClick={() => reset(emptyFilters)}
      >
        {isSubmitting ? <IonSpinner /> : 'Clear All'}
      </IonButton>
    </form>
  );
};

FilterTuteeListingForm.defaultProps = {
  submitButtonText: 'Search',
  currentData: undefined,
};

export default FilterTuteeListingForm;
