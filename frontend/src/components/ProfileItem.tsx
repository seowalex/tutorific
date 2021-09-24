import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import Avatar from 'react-avatar';

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
      <Avatar
        className={styles.avatar}
        name={profile.name}
        maxInitials={2}
        size="2.25rem"
        round
      />
      <IonLabel>{profile.name}</IonLabel>
    </IonItem>
  );
};

ProfileItem.defaultProps = {
  enableLink: false,
};

export default ProfileItem;
