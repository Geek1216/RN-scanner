import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class ScanScreen extends React.Component {
  state = {
    firstTimeUser: true
  };

  componentDidMount() {
    this.unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      !!this.scanner && this.scanner.reactivate();
    });

    /* for temporary test purpose */
    // setTimeout(() => this.onSuccess({ data: 'https://zenn.net.au/videostream/jietest2/?ticket=52G3DBGG92'}), 2000);
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }

  onSuccess = ({ data: url }) => {
    this.props.navigation.push('Result', { url });
  };

  render() {
    const { firstTimeUser } = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          {firstTimeUser ? (
            <View style={styles.instContainer}>
              <Text style={styles.instruction}>
                Please focus the camera on the ticket QR code.
                The ticket will scan and display valid ticket or invalid ticket.
              </Text>
              <TouchableOpacity
                style={styles.continue}
                onPress={() => this.setState({ firstTimeUser: false })}
              >
                <Text style={styles.continueText}>Got It</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <QRCodeScanner
              ref={(node) => { this.scanner = node }}
              onRead={this.onSuccess}
              flashMode={RNCamera.Constants.FlashMode.torch}
            />
          )}
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  instruction: {
    paddingLeft: 20,
    paddingRight: 20,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  continue: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
