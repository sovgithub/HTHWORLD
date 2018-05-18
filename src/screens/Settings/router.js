/**
 * Settings router
 */

import { createStackNavigator } from 'react-navigation';

import KYCStatus from './KYCStatus';
import DocumentVerification from './DocumentVerification';
import PersonalInfoReview from './PersonalInfoReview';

export const SettingsNavigator = createStackNavigator(
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

export const SettingsRouter = createStackNavigator(
  {
    Settings: {
      screen: SettingsNavigator
    }
  }
);

export default SettingsRouter;
