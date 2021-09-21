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
  IonTextarea,
  useIonAlert,
} from '@ionic/react';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addOutline } from 'ionicons/icons';
import {
  Level,
  Subject,
  TutorListing,
  TutorListingFormData,
} from '../app/types';
import SelectTimeSlotsItem from './timeSlots/SelectTimeSlotsItem';

import styles from './ListingForm.module.scss';
import {
  arrayToSelectedTimeSlots,
  formatTitleCase,
  mapSubject,
} from '../app/utils';

interface Props {
  onSubmit: SubmitHandler<TutorListingFormData>;
  submitButtonText?: string;
  currentData?: TutorListing;
}

const TutorListingForm: React.FC<Props> = (props: Props) => {
  const { onSubmit, submitButtonText, currentData } = props;
  console.log(currentData);
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    setValue,
    getValues,
  } = useForm<TutorListingFormData>({
    defaultValues: currentData
      ? {
          price: {
            lower: currentData.priceMin,
            upper: currentData.priceMax,
          },
          description: currentData.description,
          timeSlots: arrayToSelectedTimeSlots(currentData.timeSlots),
          subjects: currentData.subjects,
          levels: currentData.levels,
        }
      : {},
  });
  const [otherSubjects, setOtherSubjects] = useState<string[]>(
    currentData
      ? currentData.subjects.filter(
          (subject) => !Object.keys(Subject).includes(subject)
        )
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
      <IonRow>
        <IonCol>
          <Controller
            name="timeSlots"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectTimeSlotsItem
                onChange={onChange}
                value={value}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            )}
          />
        </IonCol>
      </IonRow>
      <IonRow className={styles.priceInputsRow}>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.price?.lower ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Min Price</IonLabel>
            <IonInput
              type="number"
              {...register('price.lower', {
                required: 'Min Price is required',
                min: {
                  value: 0,
                  message: 'Min Price must be positive',
                },
                valueAsNumber: true,
              })}
            />
            {errors.price?.lower && (
              <IonNote slot="helper" color="danger">
                {errors.price.lower.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.price?.upper ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Max Price</IonLabel>
            <IonInput
              type="number"
              {...register('price.upper', {
                required: 'Max Price is required',
                min: {
                  value: 0,
                  message: 'Max Price must be positive',
                },
                valueAsNumber: true,
                validate: {
                  atLeastMin: (value) =>
                    getValues('price.lower') <= value ||
                    'Max Price must be at least Min Price',
                },
              })}
            />
            {errors.price?.upper && (
              <IonNote slot="helper" color="danger">
                {errors.price.upper.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.subjects ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Subjects</IonLabel>
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
                    <IonSelectOption value={subject}>{subject}</IonSelectOption>
                  ))}
                  {Object.keys(Subject).map((key) => (
                    <IonSelectOption value={key}>
                      {Object(Subject)[key]}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
              rules={{ required: 'Please select at least one subject' }}
            />
            {errors.subjects && (
              <IonNote slot="helper" color="danger">
                {errors.subjects.message}
              </IonNote>
            )}
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
          <IonItem
            fill="outline"
            lines="full"
            color={errors.levels ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Education Levels</IonLabel>
            <IonSelect
              multiple
              cancelText="Cancel"
              okText="OK"
              {...register('levels', {
                required: 'Please select at least one level',
                minLength: {
                  value: 1,
                  message: 'Please select at least one level',
                },
              })}
            >
              {Object.values(Level).map((value) => (
                <IonSelectOption value={value}>{value}</IonSelectOption>
              ))}
            </IonSelect>
            {errors.levels && (
              <IonNote slot="helper" color="danger">
                {errors.levels.message}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonItem
            fill="outline"
            lines="full"
            color={errors.description ? 'danger' : undefined}
            disabled={isSubmitting}
          >
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea rows={5} {...register('description')} />
            {errors.description && (
              <IonNote slot="helper" color="danger">
                {errors.description}
              </IonNote>
            )}
          </IonItem>
        </IonCol>
      </IonRow>
      <IonButton expand="block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <IonSpinner /> : submitButtonText}
      </IonButton>
    </form>
  );
};

TutorListingForm.defaultProps = {
  submitButtonText: 'Submit',
  currentData: undefined,
};

export default TutorListingForm;
