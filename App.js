/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCodeStyled from 'react-native-qrcode-styled';
import CirclePieces from "./barcodeComponents/CirclePieces";
import DownloadQR from "./DownloadQR";

import CustomPieces from './barcodeComponents/CustomPieces';

//import GluedRoundedPieces from './examples/GluedRoundedPieces';
import LiquidPieces from './barcodeComponents/LiquidPieces';
//import CutCornersPieces from './examples/CutCornersPieces';
import RainStyle from './barcodeComponents/RainStyle';
//import LinearGradient from './LinearGradient';
import CustomEyes from './barcodeComponents/CustomEyes';

import CustomPiecesAndEyes from './barcodeComponents/CustomPiecesAndEyes';

const App = () => {
  const [url, setUrl] = useState('');

  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  let logoFromFile = require('./barcodeComponents/logo.png');
  const handleScan = async () => {
    setLoader(true);
    if (url !== '') {
      console.log('url');
      await BarCodeScanner.scanFromURLAsync(url)
        .then(val => {

          if (val && val.length > 0) {
            setLoader(false);
            Alert.alert('Decoded text: ', val[0].data);
          }
        })
        .catch(err => {
          console.log('err', err);

          setLoader(false);
        });
    }
  };
  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        await BarCodeScanner.scanFromURLAsync(imageUri)
          .then(val => {
            console.log("value", val);
            if (val && val.length > 0) {
              setLoader(false);
              console.log("value", val);
              setLoader1(val[0].data)
              Alert.alert('Decoded text: ', val[0].data);
            }
          })
          .catch(err => {
            console.log('err', err);
            setLoader(false);
          });
      }
    });
  };
  return (
    <ScrollView>
      <View style={styles.sectionContainer}>
        <Text style={styles.Heading}>BarCode Designs</Text>
        {/* <QRCode
          color='#6897bb'

          enableLinearGradient
          //  color={Colors.DARK_PURPLE}
          value="Just some string value"
          logo={logoFromFile}
          logoSize={20}
        // logoBorderRadius={15}
        //logoBackgroundColor={'#ffff'}

        // logoBackgroundColor='transparent'
        /> */}
        <View style={styles.root}>
          <QRCodeStyled
            data={'QR code with logo'}
            style={styles.svg}
            padding={20}
            pieceSize={8}
            color={'#000'}
            errorCorrectionLevel={'H'}
            innerEyesOptions={{
              borderRadius: 12,
              color: '#000',
            }}
            outerEyesOptions={{
              borderRadius: 12,
              color: '#ffa114',
            }}
          // s logo={

          //   {
          //    href: require('./SVG_Logo.png'),
          //     padding: 4,
          //     scale: 0.8,

          //     hidePieces: false,
          //     // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
          //   }
          // }
          />
          <View style={styles.logoContainer}>
            <Image

              source={require('./barcodeComponents/logo.png')}
              style={[styles.logo, {}]} />
          </View>

        </View>

        <CirclePieces />
        <DownloadQR />
        <CustomEyes />
        <CustomPieces />
        <CustomPiecesAndEyes />
        <LiquidPieces />
        <QRCodeStyled
          data={'QR with background'}
          style={styles.svg}
          padding={24}
          pieceSize={8}
          backgroundImage={{
            href: require('./barcodeComponents/logo.png'),
            // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
          }}
        />
        <View style={{ paddingTop: 30, width: '90%' }}>
          <TextInput
            style={styles.input}
            placeholder="Enter URL to Scan"
            onChangeText={e => setUrl(e)}
          />
        </View>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              alignItems: 'center',
              height: 45,
              justifyContent: 'center',
              borderRadius: 5,
              width: '48%'
            }}
            onPress={handleScan}
          >
            {loader ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: 'white' }}>Scan</Text>
            )}
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              alignItems: 'center',
              height: 45,
              justifyContent: 'center',
              borderRadius: 5,
              width: '48%'
            }}
            onPress={openImagePicker}>
            <Text style={{ color: 'white' }}>Upload from gallery</Text>
          </TouchableOpacity>


        </View>
        <View style={styles.textValue}>
          <Text numberOfLines={2} style={{ marginVertical: 30 }} >QR Code Value: {loader1}</Text>
          <Text > Text Length:{loader1.length}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textValue: {
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: 70,
    paddingHorizontal: 24,
    marginBottom:50
  },
  Heading: {
    fontSize: 20,
    fontWeight: '900',

  },
  input: {
    // backgroundColor: 'red',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 40,
    padding: 10,
  },
  buttonContainer: {
    paddingTop: 20,
    display: 'flex',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  logoContainer: {
    position: 'absolute',
    width: 88,
    height: 88,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    top: -2,

  },
});

export default App;
