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
  priceMin?: number;
  priceMax?: number;
  timeSlots?: NestedValue<number[]>;
  subjects?: NestedValue<string[]>;
  levels?: NestedValue<Level[]>;
  gender?: Gender;
}

interface Props {
  onSubmit: SubmitHandler<FilterTutorListingFormData>;
  submitButtonText?: string;
  currentData?: TutorFiltersState;
}

const FilterTutorListingForm: React.FC<Props> = (props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  const emptyFilters = {
    priceMin: undefined,
    priceMax: undefined,
    timeSlots: [],
    subjects: [],
    levels: [],
    gender: undefined,
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    getValues,
  } = useForm<FilterTutorListingFormData>({
    defaultValues: currentData ?? emptyFilters,
  });

  const handleReset = () => {
    reset(emptyFilters);
    console.log(getValues());
  };

  const foo = () => {
    console.log(getValues());
  }

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
                    return (
                      value == null ||
                      Number.isNaN(value) ||
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
                value === Gender.PNTS
                  ? (
                    <IonSelectOption value={null}>No Preference</IonSelectOption>
                  )
                  : (
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
      <IonButton
        expand="block"
        type='button'
        disabled={isSubmitting}
        fill='outline'
        onClick={handleReset}
      >
        {isSubmitting ? <IonSpinner /> : 'Clear All'}
      </IonButton>
      <IonButton
        expand="block"
        type='button'
        disabled={isSubmitting}
        fill='outline'
        onClick={foo}
      >
        {isSubmitting ? <IonSpinner /> : 'WTF'}
      </IonButton>
    </form>
  );
};

FilterTutorListingForm.defaultProps = {
  submitButtonText: 'Search',
  currentData: undefined,
};

export default FilterTutorListingForm;
