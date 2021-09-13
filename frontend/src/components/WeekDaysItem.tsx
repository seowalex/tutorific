import React from 'react';
import { IonIcon, IonItem, IonLabel } from '@ionic/react';
import { todayOutline } from 'ionicons/icons';

import styles from './WeekDaysItem.module.scss';
import { computeWeekDays, formatStringList } from '../app/utils';

interface Props {
  timeSlots: number[];
  detailed?: boolean;
}

const WeekDaysItem: React.FC<Props> = (props: Props) => {
  const { timeSlots, detailed } = props;
  return (
    <IonItem color="none" lines="none">
      <IonIcon icon={todayOutline} slot="start" />
      <IonLabel className={detailed ? '' : styles.weekDaysLabel}>
        {formatStringList(computeWeekDays(timeSlots))}
      </IonLabel>
    </IonItem>
  );
};

WeekDaysItem.defaultProps = {
  detailed: false,
};

export default WeekDaysItem;
