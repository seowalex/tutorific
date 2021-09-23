export enum EventCategory {
  User = 'User',
  Profile = 'Profile',
  Tutor = 'Tutor',
  Tutee = 'Tutee',
  Chat = 'Chat',
}

export enum UserEventAction {
  Create = 'Created an Account',
  Login = 'Logged in to an Account',
  Logout = 'Logged out of an Account',
}

export enum ProfileEventAction {
  Create = 'Created a Profile',
  Update = 'Updated a Profile',
}

export enum TutorEventAction {
  Create = 'Created a Tutor Listing',
  Filter = 'Filtered Tutor Listings',
  Update = 'Updated a Tutor Listing',
  Delete = 'Deleted a Tutor Listing',
}

export enum TuteeEventAction {
  Create = 'Created a Tutee Listing',
  Filter = 'Filtered Tutee Listings',
  Update = 'Updated a Tutee Listing',
  Delete = 'Deleted a Tutee Listing',
}

export enum ChatEventAction {
  Send = 'Sent a Chat Message',
}
