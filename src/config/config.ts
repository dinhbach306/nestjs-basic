import { IFireStoreProps } from 'src/config/config.interface';

export const config = (): IFireStoreProps => ({
  FIRESTORE_PROJECT_ID: process.env.FIRESTORE_PROJECT_ID || 'your-project-id',
  FIRESTORE_CLIENT_EMAIL:
    process.env.FIRESTORE_CLIENT_EMAIL || 'your-client-email',
  FIRESTORE_PRIVATE_KEY:
    process.env.FIRESTORE_PRIVATE_KEY || 'your-private-key',
});
