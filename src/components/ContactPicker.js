/**
 * react-native-search-filter Sample App
 */
import React, { Component } from 'react';
import Contacts from 'react-native-contacts';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
const KEYS_TO_FILTERS = ['givenName', 'middleName', 'familyName'];
import createStyles, { typography, colors, dimensions, section } from 'styles';

// {
//   recordID: '6b2237ee0df85980',
//   company: "",
//   emailAddresses: [{
//     label: "work",
//     email: "carl-jung@example.com",
//   }],
//   familyName: "Jung",
//   givenName: "Carl",
//   jobTitle: "",
//   middleName: "",
//   phoneNumbers: [{
//     label: "mobile",
//     number: "(555) 555-5555",
//   }],
//   hasThumbnail: true,
//   thumbnailPath: 'content://com.android.contacts/display_photo/3',
//   postalAddresses: [
//     {
//       street: '123 Fake Street',
//       city: 'Sample City',
//       state: 'CA',
//       region: 'CA',
//       postCode: '90210',
//       country: 'USA',
//       label: 'home'
//     }
//   ],
//   birthday: {"year": 1988, "month": 0, "day": 1 }
// }
//
const styles = createStyles({
  text: {
    fontSize: 14,
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    flexGrow: 1,
  },
});

export default class MyComponent extends Component {
  state = {
    searchTerm: '',
    contacts: [],
    recentContacts: ['2E73EE73-C03F-4D5F-B1E8-44E85A70F170'],
  };

  componentWillMount() {
    Contacts.getAll((err, rawContacts) => {
      const contacts = rawContacts.reduce((validContacts, contact) => {
        if (contact.emailAddresses[0]) {
          return [...validContacts, contact];
        } else {
          return validContacts;
        }
      }, []);
      this.setState({ contacts });
    });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const contactList = this.state.contacts.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );

    return (
      <View style={styles.container}>
        {contactList.map((contact, i) => {
          if (!this.state.recentContacts.includes(contact.recordID)) {
            return;
          }
          return (
            <TouchableOpacity key={contact.recordID} style={styles.emailItem}>
              <View>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                  source={{
                    uri: `https://randomuser.me/api/portraits/thumb/men/${i}.jpg`,
                  }}
                />

                <Text>{contact.familyName}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <SearchInput
          onChangeText={term => {
            this.searchUpdated(term);
          }}
          style={styless.searchInput}
          inputViewStyles={styless.searchInput}
          placeholder="Type a message to search"
        />
        <ScrollView>
          {contactList.length > 1 && <Text>Nothing to display</Text>}
          {contactList.map((contact, i) => {
            console.log(contact);
            return (
              <TouchableOpacity
                key={contact.recordID}
                style={[
                  styles.section,
                  { borderBottomWidth: 1, borderBottomColor: colors.grayLight },
                ]}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      marginRight: 20,
                    }}
                    source={{
                      uri: `https://randomuser.me/api/portraits/thumb/men/${i}.jpg`,
                    }}
                  />

                  <Text style={[styles.text, { color: colors.white }]}>
                    {contact.givenName} {contact.familyName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10,
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)',
  },
  searchInput: {
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderColor: colors.grayLight,
    color: colors.white,
  },
  input_wrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  input_dark: {
    backgroundColor: 'rgba(0,0,20, 0.25)',
    color: '#fff',
  },
  input_active: {
    borderColor: 'rgba(255,255,255, 1)',
    color: '#fff',
  },
});
