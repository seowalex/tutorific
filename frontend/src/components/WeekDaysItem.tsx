import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { todayOutline } from 'ionicons/icons';

import styles from './WeekDaysItem.module.scss';
import { computeWeekDays, formatStringList } from '../app/utils';

interface Props {
  timeSlots: number[];
}

const WeekDaysItem: React.FC<Props> = (props: Props) => {
  const { timeSlots } = props;
  return (
    <IonItem color="none" lines="none">
      <IonIcon icon={todayOutline} slot="start" />
      <IonLabel className={styles.weekDaysLabel}>
        {formatStringList(computeWeekDays(timeSlots))}
      </IonLabel>
    </IonItem>
  );
};

export default WeekDaysItem;
