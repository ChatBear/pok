import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Pressable,
} from 'react-native';
import {Card} from '@rneui/themed';
import {ThemeContext} from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getTournament} from '../services/tournament_service';
import {Tournament} from '../model/tournament';

import TournamentScreen from './TournamentScreen';
const StackAddTournament = createNativeStackNavigator();

const HomeScreen: React.FC = ({navigation}) => {
  const context = React.useContext(ThemeContext);
  // const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [actualBatch, setActualBatch] = useState(0);
  const [loading, setLoading] = useState<Boolean>(false);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [scrollFinished, setScrollFinished] = useState<Boolean>(false);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const isDarkTheme = context?.isDarkTheme;
  useEffect(() => {
    setLoading(true);

    getTournament(actualBatch).then(
      response => {
        if (response.data.length > 0) {
          setTournaments(tournaments.concat(response.data));
        } else {
          setScrollFinished(true);
        }
      },
      // setTournaments(tournaments.concat(data)),
    );

    setLoading(false);
  }, [actualBatch]);
  if (context == undefined) {
    throw new Error('useContext must be used within a ThemeContext.Provider');
  }
  const onPullRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTournaments([]);
    setActualBatch(0);
    getTournament(actualBatch).then(
      response => {
        if (response.data.length > 0) {
          setTournaments(tournaments.concat(response.data));
        } else {
          setScrollFinished(true);
        }
      },
      // setTournaments(tournaments.concat(data)),
    );
    setRefreshing(false);
  }, []);

  const onPressToTournamentPage = tournament => {
    return navigation.navigate('TournamentPage', {
      name: tournament.name,
      buyIn: tournament.buy_in,
      date: tournament.date,
    });
  };
  return !loading ? (
    <View style={styles.container}>
      <FlatList
        data={tournaments}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        renderItem={tournament => {
          return tournament.item.name ? (
            <Pressable onPress={() => onPressToTournamentPage(tournament.item)}>
              <Card containerStyle={styles.card_style}>
                <Card.Title> {tournament.item.name}</Card.Title>
                <Card.Title> {tournament.item.date}</Card.Title>
                <Card.Title> Buy In : {tournament.item.buy_in}</Card.Title>
              </Card>
            </Pressable>
          ) : (
            ''
          );
        }}
        onEndReached={() =>
          !scrollFinished ? setActualBatch(actualBatch + 20) : ''
        }
        onEndReachedThreshold={0.8}
      />
    </View>
  ) : (
    ''
  );
};

const Home: React.FC = () => {
  return (
    <StackAddTournament.Navigator>
      <StackAddTournament.Screen
        name="HomePage"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <StackAddTournament.Screen
        name="TournamentPage"
        component={TournamentScreen}
        options={{headerShown: false}}
      />
    </StackAddTournament.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    borderWidth: 1,
    flex: 1,
    fontSize: 20,
  },
  color_button: {
    paddingRight: 15,
  },
  card_style: {
    backgroundColor: 'gray',
  },
});
export default Home;
