/**
 * Settings router
 */

import { StackNavigator } from 'react-navigation';

import KYCStatus from './KYCStatus';
import DocumentVerification from './DocumentVerification';
import PersonalInfoReview from './PersonalInfoReview';

export const SettingsNavigator = StackNavigator(
  {
    KYCStatus: {
      screen: KYCStatus
    },
    PersonalInfoReview: {
      screen: PersonalInfoReview
    },
    DocumentVerification: {
      screen: DocumentVerification
    }
  },
  {
    initialRouteName: 'KYCStatus'
  }
);

export const SettingsRouter = StackNavigator(
  {
    Settings: {
      screen: SettingsNavigator
    }
  }
);

export default SettingsRouter;
