import React from 'react';
import {
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonText,
} from '@ionic/react';
import styles from './ListingDetail.module.scss';

interface Props {
  header: string;
  label?: string;
  children?: React.ReactNode;
}

const ListingDetail: React.FC<Props> = (props: Props) => {
  const { header, label, children } = props;

  return (
    <IonItemGroup>
      <IonItemDivider>
        <IonLabel>{header}</IonLabel>
      </IonItemDivider>
      {label ? (
        <IonItem>
          <IonText className={styles.itemText}>{label}</IonText>
        </IonItem>
      ) : (
        children
      )}
    </IonItemGroup>
  );
};

ListingDetail.defaultProps = {
  label: '',
  children: null,
};

export default ListingDetail;
