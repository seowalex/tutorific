import React from 'react';
import { IonAvatar, IonItem, IonLabel } from '@ionic/react';

import styles from './ProfileItem.module.scss';
import { Profile } from '../types/profile';

interface Props {
  profile: Profile;
  enableLink?: boolean;
}

const ProfileItem: React.FC<Props> = (props: Props) => {
  const { profile, enableLink } = props;

  return (
    <IonItem
      color="none"
      lines="full"
      className={styles.profileHeader}
      button={enableLink}
      mode="ios"
      routerLink={enableLink ? `/profile/${profile.id}` : undefined}
    >
      <IonAvatar slot="start">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            profile.name
          )}&background=random`}
        />
      </IonAvatar>
      <IonLabel>{profile.name}</IonLabel>
    </IonItem>
  );
};

ProfileItem.defaultProps = {
  enableLink: false,
};

export default ProfileItem;
