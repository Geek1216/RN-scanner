import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginRequest } from '../actions';

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleLogin = () => {
    Keyboard.dismiss();

    const { username, password } = this.state;
    this.props.loginRequest(username, password);
  }

  render() {
    const { error } = this.props;
    const { username, password } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.frame}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Username"
              value={username}
              onChangeText={text => this.setState({ username: text })}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={text => this.setState({ password: text })}
            />
            <Text style={styles.error}>
              {error ? error.message : ''}
            </Text>
            <TouchableOpacity
              style={styles.login}
              onPress={this.handleLogin}
            >
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    padding: 20,
  },
  input: {
    marginTop: 20,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#cccccc',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  login: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4444FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FF4444',
    height: 20,
    marginTop: 12,
    marginBottom: 12,
  },
});

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loginRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
