import { UserDocument } from 'src/users/document/user.document';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  UserDocument.collectionName,
];
