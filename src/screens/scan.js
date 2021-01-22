import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Linking
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class ScanScreen extends React.Component {
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
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <QRCodeScanner
            ref={(node) => { this.scanner = node }}
            onRead={this.onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
          />
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
