import React from 'react';
import { IonAvatar, IonItem, IonLabel } from '@ionic/react';

import styles from './ProfileItem.module.scss';
import { Profile } from '../app/types';

interface Props {
  profile: Profile;
}

const ProfileItem: React.FC<Props> = (props: Props) => {
  const { profile } = props;

  return (
    <IonItem color="none" lines="full" className={styles.profileHeader}>
      <IonAvatar slot="start">
        <img
          src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
          alt=""
        />
      </IonAvatar>
      <IonLabel>{profile.name}</IonLabel>
    </IonItem>
  );
};

export default ProfileItem;
