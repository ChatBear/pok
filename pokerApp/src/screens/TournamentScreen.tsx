import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import {ThemeContext} from '../../App';

interface TournamentScreenProps {
  name: string;
  buyIn: number;
  date: string;
  navigation: any;
}

// TODO Typé correctement la prop il s'agit d'un React.JSX.Element
const TournamentScreen: React.FC = params => {
  const context = React.useContext(ThemeContext);
  const {isDarkTheme} = context;

  const {name, buyIn, date} = params.route.params;
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: isDarkTheme ? 'white' : 'black',
          },
        ]}>
        Tournois : {name}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: isDarkTheme ? 'white' : 'black',
          },
        ]}>
        Buy In : {buyIn}
      </Text>
      <Text
        style={[
          styles.text,
          {
            color: isDarkTheme ? 'white' : 'black',
          },
        ]}>
        Date : {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'gray',
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default TournamentScreen;
