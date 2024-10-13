import React, {useEffect, useState} from 'react';
import {
  Appearance,
  Text,
  Button,
  View,
  useColorScheme,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Home from './src/screens/Accueil';
import SettingsScreen from './src/screens/AccountScreen';
import AddingTournamentScreen from './src/screens/AddingTournamentScreen';

export interface ThemeContextType {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

function App(): React.JSX.Element {
  const systemTheme: string | null | undefined = Appearance.getColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    systemTheme === 'dark' ? true : false,
  );
  const [currentThemeScheme, setCurrentThemeScheme] = useState<
    typeof DefaultTheme | typeof DarkTheme
  >(systemTheme === 'dark' ? DarkTheme : DefaultTheme);

  const onPressColor = (): void => {
    if (currentThemeScheme['dark']) {
      setCurrentThemeScheme(DefaultTheme);
      setIsDarkTheme(false);
    } else {
      setCurrentThemeScheme(DarkTheme);
      setIsDarkTheme(true);
    }
  };

  return (
    <ThemeContext.Provider value={{isDarkTheme, setIsDarkTheme}}>
      <NavigationContainer theme={currentThemeScheme}>
        <Tab.Navigator
          screenOptions={({
            route,
          }: {
            route: RouteProp<ParamListBase, string>;
          }) => ({
            tabBarIcon: ({focused, color, size}) => {
              if (route.name == 'Home') {
                return <Ionicons name={'home'} size={size} color={color} />;
              }
              if (route.name == 'Settings') {
                return <Ionicons name={'settings'} size={size} color={color} />;
              }

              return null;
            },

            // tabBarActiveTintColor: 'tomato',
            tabBarActiveTintColor: currentThemeScheme['dark']
              ? 'white'
              : 'black',
            tabBarInactiveTintColor: 'gray',
            title: 'Tournaments',
          })}>
          <Tab.Screen
            name="Home"
            component={Home}
            // options={{headerShown: false}}
            options={({navigation}) => ({
              title: 'Tournaments',
              headerRight: () => {
                const onPressForm = () => {
                  return navigation.navigate('Adding Form');
                };
                return (
                  <View style={styles.container}>
                    <Pressable
                      style={styles.color_button}
                      onPress={({navigation}) => onPressForm(navigation)}>
                      <AntDesign
                        name={'plussquareo'}
                        size={30}
                        color={currentThemeScheme['dark'] ? 'white' : 'black'}
                      />
                    </Pressable>
                    <Pressable
                      style={styles.color_button}
                      onPress={onPressColor}>
                      <Ionicons
                        name={'moon-outline'}
                        size={30}
                        color={currentThemeScheme['dark'] ? 'white' : 'black'}
                      />
                    </Pressable>
                  </View>
                );
              },
            })}
          />
          <Tab.Screen
            name="Adding Form"
            component={AddingTournamentScreen}
            options={{
              headerShown: false,
              tabBarButton: props => null,
              tabBarStyle: {display: 'none'},
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'Settings',
              headerRight: () => (
                <Pressable style={styles.color_button} onPress={onPressColor}>
                  <Ionicons
                    name={'moon-outline'}
                    size={30}
                    color={currentThemeScheme['dark'] ? 'white' : 'black'}
                  />
                </Pressable>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dark: {
    backgroundColor: '#1A1A1A',
    color: '#FAFAFA',
  },
  light: {
    backgroundColor: '#FAFAFA',
    color: '#1A1A1A',
  },
  color_button: {
    paddingRight: 15,
  },
});

export default App;
