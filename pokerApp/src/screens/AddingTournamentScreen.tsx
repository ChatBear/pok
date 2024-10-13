import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {ThemeContext} from '../../App';
import {Button} from '@rneui/base';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

// import {useAddTournament} from '../hook/tournament/tournament';
import {addTournamentService} from '../services/tournament_service';
import {Tournament} from '../model/tournament';

// Typer cela quand je reviens dans le code
const AddingTournamentScreen: React.FC = (navigation: any) => {
  // const navigation_ = navigation['navigation'];
  // console.log(navigation_);
  const [buyIn, setBuyIn] = useState(0);
  const [tournamentName, setTournamentName] = useState('');
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date());
  const context = React.useContext(ThemeContext);

  if (context == undefined) {
    throw new Error('useContext must be used within a ThemeContext.Provider');
  }
  const {isDarkTheme} = context;
  const onPressSubmit = () => {
    const checkTournamentName: boolean = tournamentName.length > 0;

    if (checkTournamentName) {
      const newTournament: Tournament = {
        name: tournamentName,
        date: date,
        buyIn: buyIn,
      };
      // useAddTournament(newTournament);
      addTournamentService(newTournament).then(response => {
        return response;
      });
      Alert.alert('The tournament has been submitted');
      return navigation['navigation'].navigate('Home');
    } else {
      Alert.alert('Tournament name is empty');
    }
  };

  const onChangeBuyIn = (buyin: string) => {
    const numericValue = Number(buyin.replace(/[^0-9]/g, ''));
    setBuyIn(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: isDarkTheme ? 'white' : 'black',
            borderColor: error ? 'red' : 'black',
            paddingTop: 20,
          },
        ]}>
        Tournament's name
      </Text>
      <TextInput
        style={[
          styles.text_input,
          {
            color: isDarkTheme ? 'black' : 'white',
            backgroundColor: isDarkTheme ? 'gray' : 'black',
          },
        ]}
        placeholder=""
        onChangeText={setTournamentName}
      />

      <Text
        style={[
          styles.text,
          {
            color: isDarkTheme ? 'white' : 'black',
            paddingTop: 20,
          },
        ]}>
        Buy In
      </Text>
      <TextInput
        style={[
          styles.text_input,
          {
            color: isDarkTheme ? 'black' : 'white',
            backgroundColor: isDarkTheme ? 'gray' : 'black',
          },
        ]}
        placeholder="0"
        keyboardType="numeric"
        onChangeText={onChangeBuyIn}
      />

      <Text
        style={[
          styles.text,
          {
            color: isDarkTheme ? 'white' : 'black',
            paddingTop: 20,
          },
        ]}>
        Date
      </Text>

      <DatePicker
        date={date}
        onDateChange={setDate}
        theme={isDarkTheme ? 'dark' : 'light'}
      />

      <Button
        title={'Create the tournament'}
        onPress={onPressSubmit}
        buttonStyle={{
          backgroundColor: isDarkTheme ? 'white' : 'black',
          borderRadius: 3,
        }}
        titleStyle={{
          color: isDarkTheme ? 'black' : 'white',
          marginHorizontal: 20,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    padding: 10,

    // alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '500',
    marginBottom: 10,
  },
  text_input: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  // button_submit: {
  //   backgroundColor: 'gray',
  //   marginTop: 10,
  //   borderRadius: 10,
  // },
});
export default AddingTournamentScreen;
