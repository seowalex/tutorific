import React, { useState } from 'react';
import {
  IonButton,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  useIonAlert,
} from '@ionic/react';
import {
  Controller,
  NestedValue,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { addOutline } from 'ionicons/icons';
import { Level, SelectedTimeSlots, Subject } from '../types/listing';
import { Gender } from '../types/profile';
import { TutorFiltersState } from '../reducers/tutorFilters';

import styles from './ListingForm.module.scss';
import {
  arrayToSelectedTimeSlots,
  formatTitleCase,
  mapSubject,
} from '../app/utils';
import SelectTimeSlotsItem from './timeSlots/SelectTimeSlotsItem';

export interface FilterTutorListingFormData {
  priceMin?: number;
  priceMax?: number;
  timeSlots: NestedValue<SelectedTimeSlots>;
  subjects: NestedValue<string[]>;
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
    timeSlots: {},
    subjects: [],
    levels: [],
    gender: undefined,
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<FilterTutorListingFormData>({
    defaultValues: currentData
      ? {
          ...currentData,
          timeSlots: arrayToSelectedTimeSlots(currentData.timeSlots),
        }
      : emptyFilters,
  });
  const [otherSubjects, setOtherSubjects] = useState<string[]>(
    currentData
      ? currentData.subjects?.filter(
          (subject) => !Object.keys(Subject).includes(subject)
        ) ?? []
      : []
  );
  const [presentAddSubjectAlert, dismissAddSubjectAlert] = useIonAlert();

  const handleAddSubject = (value: Record<number, string>) => {
    const addedSubject = formatTitleCase(value[0]);
    const mappedSubject = mapSubject(addedSubject);
    const currentSubjects = getValues('subjects') ?? [];
    if (
      !otherSubjects.includes(addedSubject) &&
      !currentSubjects.includes(addedSubject) &&
      mappedSubject == null
    ) {
      setOtherSubjects([addedSubject, ...otherSubjects]);
    }
    if (!currentSubjects.includes(mappedSubject ?? addedSubject)) {
      setValue('subjects', [mappedSubject ?? addedSubject, ...currentSubjects]);
    }
  };

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
                    const priceMin = getValues('priceMin');
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
            <IonLabel position="stacked">Subjects (all of the following)</IonLabel>
            <Controller
              name="subjects"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <IonSelect
                  multiple
                  cancelText="Cancel"
                  okText="OK"
                  onIonChange={onChange}
                  onIonBlur={onBlur}
                  value={value}
                >
                  {otherSubjects.map((subject) => (
                    <IonSelectOption value={subject} key={subject}>
                      {subject}
                    </IonSelectOption>
                  ))}
                  {Object.keys(Subject).sort().map((key) => (
                    <IonSelectOption value={key} key={key}>
                      {Object(Subject)[key]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
            />
          </IonItem>
          <IonButton
            expand="block"
            fill="outline"
            onClick={() =>
              presentAddSubjectAlert({
                header: 'Add Other Subject',
                message: 'Enter your subject:',
                inputs: [{ type: 'text' }],
                buttons: [
                  {
                    text: 'Cancel',
                    handler: dismissAddSubjectAlert,
                  },
                  {
                    text: 'Ok',
                    handler: handleAddSubject,
                  },
                ],
              })
            }
          >
            <IonIcon slot="start" icon={addOutline} />
            Add Other Subject
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem fill="outline" lines="full" disabled={isSubmitting}>
            <IonLabel position="stacked">Education Levels (all of the following)</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('levels')}
            >
              {Object.values(Level).map((value) => (
                <IonSelectOption value={value} key={value}>
                  {value}
                </IonSelectOption>
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
                      <IonSelectOption value={null} key={null}>
                        No Preference
                      </IonSelectOption>
                    ) : (
                      <IonSelectOption value={gender} key={gender}>
                        {gender}
                      </IonSelectOption>
                    )
                  )}
                </IonSelect>
              )}
            />
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <Controller
            name="timeSlots"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectTimeSlotsItem
                onChange={onChange}
                value={value ?? {}}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            )}
          />
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

FilterTutorListingForm.defaultProps = {
  submitButtonText: 'Search',
  currentData: undefined,
};

export default FilterTutorListingForm;
