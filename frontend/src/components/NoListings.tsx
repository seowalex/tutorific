import React from 'react';
import { closeCircle } from 'ionicons/icons';

import { ListingType } from '../types/listing';

import EmptyPlaceholder from './EmptyPlaceholder';

import styles from './NoListings.module.scss';

interface Props {
  listingType: ListingType;
  owner: 'self' | 'other' | 'all';
}

const NoListings: React.FC<Props> = ({ listingType, owner }) => {
  const getMessage = () => {
    switch (owner) {
      case 'self':
        return `You have no ${listingType.toLowerCase()} listings.`;
      case 'other':
        return `This person has no ${listingType.toLowerCase()} listings.`;
      case 'all':
        return `No ${listingType.toLowerCase()} listings found.`;
      default:
        return '';
    }
  };

  return (
    <div className={styles.noListingsContainer}>
      <EmptyPlaceholder icon={closeCircle} text={getMessage()} />
    </div>
  );
};

export default NoListings;
