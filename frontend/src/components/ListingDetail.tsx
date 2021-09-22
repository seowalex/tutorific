import React from 'react';
import { IonItem, IonLabel, IonText } from '@ionic/react';
import styles from './ListingDetail.module.scss';

interface Props {
  header: string;
  label?: string;
  children?: React.ReactNode;
}

const ListingDetail: React.FC<Props> = (props: Props) => {
  const { header, label, children } = props;

  return (
    <IonItem fill="solid" lines="none">
      <IonLabel position="stacked">{header}</IonLabel>
      {label ? (
        <IonText className={styles.itemText}>{label}</IonText>
      ) : (
        children
      )}
    </IonItem>
  );
};

ListingDetail.defaultProps = {
  label: '',
  children: null,
};

export default ListingDetail;
