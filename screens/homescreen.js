import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { ProfileDetailComponent } from '../components/profiledetail';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

// or any pure javascript modules available in npm
import { ActivityIndicator, Card } from 'react-native-paper';
import { StaffScreen } from './staffscreen';

const Drawer = createDrawerNavigator()

export function HomeScreen({ user, setLoggedUser }) {
  return (
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Home" backBehavior='firstRoute' drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label='Sign out' onPress={() => setLoggedUser(null)} />

          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="Home" initialParams={{ user }} component={Home} />
        <Drawer.Screen name="Staff" component={StaffScreen} initialParams={{ user }} />
        <Drawer.Screen name="Continents" component={Home} initialParams={{ user }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function Home({ navigation, route }) {
  const [user, setUser] = React.useState(route.params.user);
  fetch('https://dummyjson.com/users/' + user.id)
    .then((res) => res.json())
    .then(setUser);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <Text>Welcome</Text>
        <Text style={styles.bold}>
          {' '}
          {user.firstName} {user.lastName}
        </Text>
      </View>
      {user.phone ? (
        <View>
          <Text style={{ marginVertical: 15 }}>
            Your profile details is as below:
          </Text>
          <ProfileDetailComponent
            key="Gender"
            title="Gender"
            value={user.gender}
          />
          <ProfileDetailComponent
            key="Email"
            title="Email"
            value={user.email}
          />
          <ProfileDetailComponent
            key="Phone"
            title="Phone"
            value={user.phone}
          />
          <ProfileDetailComponent
            key="Birth Date"
            title="Birth Date"
            value={user.birthDate}
          />
          <ProfileDetailComponent
            key="Bloog Group"
            title="Blood Group"
            value={user.bloodGroup}
          />
          <ProfileDetailComponent
            key="Height"
            title="Height"
            value={user.height}
          />
          <ProfileDetailComponent
            key="Weight"
            title="Weight"
            value={user.weight}
          />
          <ProfileDetailComponent
            key="Eye color"
            title="Eye color"
            value={user.eyeColor}
          />
        </View>
      ) : (
        <View>
          <Text>Loading your data please wait.......</Text>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});