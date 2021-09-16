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
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import { Gender, Level, Subject, WeekDay } from '../app/types';
import { TutorFiltersState } from '../reducers/tutorFilters';

import styles from './ListingForm.module.scss';

export interface FilterTutorListingFormData {
  priceMin: number | null;
  priceMax: number | null;
  timeSlots: NestedValue<number[]>;
  subjects: NestedValue<string[]>;
  levels: NestedValue<Level[]>;
  gender: Gender | null;
}

interface Props {
  onSubmit: SubmitHandler<FilterTutorListingFormData>;
  submitButtonText?: string;
  currentData?: TutorFiltersState;
}

const FilterTutorListingForm: React.FC<Props> = (props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm<FilterTutorListingFormData>({
    defaultValues: currentData ?? {},
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
            <IonInput
              type="number"
              {...register('priceMin', {
                min: {
                  value: 0,
                  message: 'Min Price must be positive',
                },
                valueAsNumber: true,
              })}
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
            <IonInput
              type="number"
              {...register('priceMax', {
                min: {
                  value: 0,
                  message: 'Max Price must be positive',
                },
                valueAsNumber: true,
                validate: {
                  atLeastMin: (value) => {
                    const priceMin = getValues('priceMin')!;
                    console.log(priceMin);
                    console.log(Number.isNaN(value!));
                    console.log(Number.isNaN(priceMin));
                    console.log(priceMin <= value!);
                    return (
                      Number.isNaN(value!) ||
                      Number.isNaN(priceMin) ||
                      priceMin <= value! ||
                      'Max Price must be at least Min Price'
                    );
                  },
                },
              })}
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
            <IonLabel position="stacked">Gender</IonLabel>
            <IonSelect cancelText="Cancel" okText="OK" {...register('gender')}>
              {Object.values(Gender).map((value) =>
                value === Gender.PNTS ? null : (
                  <IonSelectOption value={value}>{value}</IonSelectOption>
                )
              )}
            </IonSelect>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonButton expand="block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <IonSpinner /> : submitButtonText}
      </IonButton>
    </form>
  );
};

FilterTutorListingForm.defaultProps = {
  submitButtonText: 'Search',
  currentData: undefined,
};

export default FilterTutorListingForm;
