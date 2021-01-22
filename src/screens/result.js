import React from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import Api from '../api';

export default class ResultScreen extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    const { url } = this.props.route.params;
    try {
      const { title, success, buyer, message } = await Api.validateTicket(url);
      this.setState({
        title,
        success,
        buyer,
        message,
        loading: false
      });
    } catch (e) {
      this.setState({
        success: false,
        message: e.message,
        loading: false
      });
    }
  }

  render() {
    const { loading ,title, success, buyer, message } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={styles.frame}>
              {!!title && <Text style={styles.title}>{title}</Text>}
              {!!buyer && <Text style={styles.buyer}>User: {buyer}</Text>}
              <Text style={success ? styles.success : styles.failure}>
                {success ? 'Valid Ticket' : 'Invalid Ticket'}
              </Text>
              {!success && <Text style={styles.error}>{message}</Text>}
              <TouchableOpacity
                style={styles.continue}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text style={styles.continueText}>Continue Scanning</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  frame: {
    padding: 20,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buyer: {
    marginTop: 16,
    fontSize: 20,
    textAlign: 'center'
  },
  success: {
    marginTop: 40,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#00FF00'
  },
  failure: {
    marginTop: 40,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF0000'
  },
  error: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
    color: '#FF0000'
  },
  continue: {
    marginTop: 40,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4444FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontSize: 20,
    color: '#FFFFFF'
  }
});
