import React from 'react';
import { IonIcon } from '@ionic/react';

import styles from './EmptyPlaceholder.module.scss';

interface Props {
  icon: string;
  text: string;
}

const EmptyPlaceholder: React.FC<Props> = ({ icon, text }) => (
  <div className={styles.container}>
    <IonIcon className={styles.icon} icon={icon} />
    <p className={styles.text}>{text}</p>
  </div>
);

export default EmptyPlaceholder;
