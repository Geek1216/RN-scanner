import 'react-native-gesture-handler';
import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/login';
import ScanScreen from './screens/scan';
import ResultScreen from './screens/result';

import { autoLogin, logout } from './actions';

const Stack = createStackNavigator();

class Navigation extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  handleLogout = () => {
    Alert.alert(
      'Confirm',
      'Do you really want to log out?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: this.props.logout },
      ]
    );
  }

  render() {
    const { loading, loggedIn } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          {loggedIn ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                  headerRight: () => (
                    <Button
                      onPress={this.handleLogout}
                      title="Log Out"
                    />
                  ),
                }}
              />
              <Stack.Screen name="Result" component={ResultScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
        {loading && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  loggedIn: state.auth.loggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  autoLogin,
  logout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
