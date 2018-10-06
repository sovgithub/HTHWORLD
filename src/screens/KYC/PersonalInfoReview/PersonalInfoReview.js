import React from 'react';
import PropTypes from 'prop-types';
import { Linking } from 'react-native';

import ConfirmInformation from './ConfirmInformation';
import FillOutThisInput from './FillOutThisInput';

import { snakeToCamel, camelToTitle } from 'lib/string-helpers';
import { keyMapper } from 'lib/object-helpers';

const SUPPORT_URL = 'support@hthcoin.world';

/*
Jumio returns Netverify success response like:
{
  selectedCountry: USA,
  addressLine:someaddress,
  expiryDate: 20200101T00,
  postCode: 02255,
  city: BOSTON,
  scanReference: {UUID},
  idNumber: {ID},
  lastName: DOE,
  issuingCountry: USA,
  firstName: JOHN,
  dob: 19800101T00000000,
  issuingDate: 20150111T00000000,
  middleName: W,
  selectedDocumentType: DRIVER_LICENSE,
  subdivision: RI,
  extractionMethod: BARCODE,
  gender: m
}
*/

const SAMPLE_JUMIO_DATA = {
  selectedCountry: 'USA',
  addressLine: '123 MAIN STREET',
  expiryDate: '20200101T00',
  postCode: '02255',
  city: 'BOSTON',
  scanReference: '12345-12345-12345',
  idNumber: '12345',
  lastName: 'DOE',
  issuingCountry: 'USA',
  firstName: 'JOHN',
  dob: '19800101T00000000',
  issuingDate: '20150111T00000000',
  middleName: 'W',
  selectedDocumentType: 'DRIVER_LICENSE',
  subdivision: 'RI',
  extractionMethod: 'BARCODE',
  gender: 'm',
};

const USER_INFO_FIELDS = {
  email_address: { label: 'Email Address', type: 'string', required: true },
  first_name: { label: 'First Name', type: 'string', required: true },
  last_name: { label: 'Last Name', type: 'string', required: true },
  birthdate: { label: 'Birthdate', type: 'string', required: true },
  street_address: { label: 'Street Address', type: 'string', required: true },
  city: { label: 'City', type: 'string', required: true },
  state: { label: 'State', type: 'string', required: true },
  postal_code: { label: 'Postal Code', type: 'string', required: true },
  country: { label: 'Country', type: 'string', required: true },
};

const JUMIO_TO_NORMALIZED_MAP = {
  addressLine: 'streetAddress',
  postCode: 'postal_code',
  idNumber: 'id_number',
  lastName: 'last_name',
  issuingCountry: 'country',
  firstName: 'first_name',
  dob: 'birthdate',
  middleName: 'middle_name',
  subdivision: 'state',
};

export default class Verification extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    kyc: PropTypes.shape({
      user_information: PropTypes.object.isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    infoVerificationConfirmation: PropTypes.func.isRequired,
  };

  static defaultProps = {
    kyc: {
      user_information: keyMapper(SAMPLE_JUMIO_DATA, JUMIO_TO_NORMALIZED_MAP),
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      initialFields: this.getInitialFormInputs(props.kyc.user_information),
      missingFields: this.getMissingInputs(props.kyc.user_information),
      step: 0,
    };
  }

  getMissingInputs = recievedFields => {
    return Object.keys(USER_INFO_FIELDS).reduce((fields, key) => {
      const item = USER_INFO_FIELDS[key];
      const value = recievedFields[key];
      if (item && item.required && !value) {
        return [
          ...fields,
          {
            label: item.label,
            value: '',
          },
        ];
      } else {
        return fields;
      }
    }, []);
  };

  getInitialFormInputs = receivedFields => {
    // Let's show the user which fields we've captured, omitting any on our blacklist.
    const blacklist = [
      'scanReference',
      'issuingCountry',
      'selectedCountry',
      'extractionMethod',
    ];
    return Object.keys(receivedFields).reduce((fields, key) => {
      if (!blacklist.includes(key)) {
        return [
          ...fields,
          {
            label: camelToTitle(snakeToCamel(key)),
            value: receivedFields[key],
            // onSubmit this.updateFormField(key)
          },
        ];
      } else {
        return fields;
      }
    }, []);
  };

  updateFormField = index => value => {
    this.setState({
      missingFields: [
        ...this.state.missingFields.slice(0, index),
        {
          ...this.state.missingFields[index],
          value,
        },
        ...this.state.missingFields.slice(index + 1),
      ],
    });
  };

  nextStep = () => this.setState({ step: this.state.step + 1 });

  changeInputs = () => this.setState({ step: 1 });

  submitForm = () => {
    this.props.infoVerificationConfirmation({
      ...this.state.initialFields,
      ...this.state.missingFields,
    });
    this.props.navigation.navigate('KYC');
  };

  handleSupportRequest = () => {
    Linking.canOpenURL(SUPPORT_URL).then(supported => {
      if (supported) {
        Linking.openURL(SUPPORT_URL);
      }
    });
  };

  render() {
    const { step, initialFields, missingFields } = this.state;

    switch (step) {
      case 0:
        return (
          <ConfirmInformation
            cancelText="Not you? Contact us and we'll help!"
            confirmText="Yes, this information is correct."
            fields={initialFields}
            introText="Please verify the following information is correct. If there is an error, please contact us immediately."
            onConfirm={this.nextStep}
            onCancel={this.handleSupportRequest}
          />
        );
      case missingFields.length + 1:
        return (
          <ConfirmInformation
            cancelText="Oops, I messed up, let me fix that."
            confirmText="Looks good!"
            fields={missingFields}
            introText="Is this information correct?"
            onConfirm={this.submitForm}
            onCancel={this.changeInputs}
          />
        );
      default:
        return (
          <FillOutThisInput
            label={missingFields[step - 1].label}
            value={missingFields[step - 1].value}
            onChangeText={this.updateFormField(step - 1)}
            onSubmit={this.nextStep}
          />
        );
    }
  }
}
