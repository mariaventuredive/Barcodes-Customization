

import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HCESessionProvider } from 'react-native-hce';
import SetupView from './SetupView';
import LogView from './LogView';
import NavButton from './Controls/NavButton';
import StateFab from './StateFAB';
import type { DataLayer } from './DataLayerTypes';
import useDataLayer from './useDataLayer';
import QRCodeStyled from 'react-native-qrcode-styled';
import DownloadQR from './DownloadQR';
import LiquidPieces from './barcodeComponents/LiquidPieces';

enum Views {
  VIEW_SETUP,
  VIEW_LOG,
}

const App: React.FC = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<Views>(Views.VIEW_SETUP);
  const dataLayer: DataLayer = useDataLayer();

  return (
    <View style={styles.container}>
   

      <View style={styles.content}>
        <View style={{ alignSelf: 'center', marginTop: 50 }}>
          <LiquidPieces />
        </View>
        {dataLayer.loading && <Text style={{color:'grey'}}>Loading...</Text>}
        {currentView === Views.VIEW_SETUP && <SetupView {...dataLayer} />}
        {currentView === Views.VIEW_LOG && <LogView {...dataLayer} />}
      </View>

      <StateFab {...dataLayer} />
    </View>
  );
};

export default () => (
  <HCESessionProvider>
    <App />
  </HCESessionProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff',
    padding:20
  },
  navigation: {
    flexDirection: 'row',
    margin: 10,
  },
  content: {
    flex: 1,
    width: '100%',
  },
});




// import React, { useState, useEffect } from 'react';
// import { launchImageLibrary } from 'react-native-image-picker';
// import QRCode from 'react-native-qrcode-svg';
// import NfcManager, { NfcTech } from 'react-native-nfc-manager';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Alert,
//   ScrollView,
//   Image
// } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import QRCodeStyled from 'react-native-qrcode-styled';
// import CirclePieces from "./barcodeComponents/CirclePieces";
// import DownloadQR from "./DownloadQR";
// import { HCESession, NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
// import CustomPieces from './barcodeComponents/CustomPieces';

// //import GluedRoundedPieces from './examples/GluedRoundedPieces';
// import LiquidPieces from './barcodeComponents/LiquidPieces';
// //import CutCornersPieces from './examples/CutCornersPieces';
// import RainStyle from './barcodeComponents/RainStyle';
// //import LinearGradient from './LinearGradient';
// import CustomEyes from './barcodeComponents/CustomEyes';

// import CustomPiecesAndEyes from './barcodeComponents/CustomPiecesAndEyes';
// //NfcManager.start();

// const App = () => {


//   const [url, setUrl] = useState('');

//   const [loader, setLoader] = useState(false);
//   const [loader1, setLoader1] = useState(false);
//   let logoFromFile = require('./barcodeComponents/logo.png');
//   const handleScan = async () => {
//     setLoader(true);
//     if (url !== '') {
//       console.log('url');
//       await BarCodeScanner.scanFromURLAsync(url)
//         .then(val => {

//           if (val && val.length > 0) {
//             setLoader(false);
//             Alert.alert('Decoded text: ', val[0].data);
//           }
//         })
//         .catch(err => {
//           console.log('err', err);

//           setLoader(false);
//         });
//     }
//   };
//   const openImagePicker = async () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: false,
//       maxHeight: 2000,
//       maxWidth: 2000,
//     };

//     launchImageLibrary(options, async response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('Image picker error: ', response.error);
//       } else {
//         let imageUri = response.uri || response.assets?.[0]?.uri;
//         await BarCodeScanner.scanFromURLAsync(imageUri)
//           .then(val => {
//             console.log("value", val);
//             if (val && val.length > 0) {
//               setLoader(false);
//               console.log("value", val);
//               setLoader1(val[0].data)
//               Alert.alert('Decoded text: ', val[0].data);
//             }
//           })
//           .catch(err => {
//             console.log('err', err);
//             setLoader(false);
//           });
//       }
//     });
//   };
//   let session;
//   async function readNdef() {



//     const startSession = async () => {
//       const tag = new NFCTagType4({
//         type: NFCTagType4NDEFContentType.Text,
//         content: "MARIAHello world Ticksss",
//         writable: false
//       });

//       session = await HCESession.getInstance();
//       console.log("session Res", session);
//       console.log("session tag", tag);
//       session.setApplication(tag);
//       await session.setEnabled(true);
//     }

//     startSession();

//   }


//   const stopSession = async () => {
//     await session.setEnabled(false);
//   }


//   const listen = async () => {
//     console.log("session to listen", session);



//     session = await HCESession.getInstance();

//     const removeListener = session.on(HCESession.Events.HCE_STATE_READ, async() => {

//       console.log("session Res", session);

//     //  console.log("DATA",data);
//       alert("The tag has been read! Thank You.")
//     });

//     // to remove the listener:
//     removeListener();
//   }





//   //wd Manager
//   useEffect(() => {
//     const initNFC = async () => {
//       try {
//         await NfcManager.start();
//       } catch (ex) {
//         console.warn('NFC initialization error', ex);
//       }
//     };

//     initNFC();

//     return () => {
//       //  NfcManager.stop();
//     };
//   }, []);

//   const handleNfcDiscovery = async () => {
//     try {
//       await NfcManager.requestTechnology(NfcTech.Ndef);
//       const tag = await NfcManager.getTag();
//       // Handle tag data
//       console.log("getTagData", tag);
//     } catch (ex) {
//       console.warn('NFC discovery error', ex);
//     } finally {
//       NfcManager.cancelTechnologyRequest();
//     }
//   };

//   return (

//     <ScrollView
//       contentContainerStyle={{ alignItems: 'center' }}
//       style={{
//         // backgroundColor: '#ffff',

//       }}>

//       <View style={[styles.sectionContainer, { height: 500 }]}>
//         <Text style={styles.Heading}>Peer To Peer</Text>

//         <TouchableOpacity
//           style={styles.wrapper}
//           onPress={readNdef}
//         >
//           <Text style={styles.Heading}>Start Session</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.wrapper}
//           onPress={listen}
//         >
//           <Text style={styles.Heading}>Listen</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.wrapper}
//           onPress={stopSession}
//         >
//           <Text style={styles.Heading}>Stop a Session</Text>
//         </TouchableOpacity>


//         <Text style={[styles.Heading, { marginTop: 50 }]}>NFC Manager</Text>

//         <TouchableOpacity style={[styles.wrapper]} onPress={handleNfcDiscovery}>

//           <Text style={styles.Heading}>Start NFC Discovery</Text>
//         </TouchableOpacity>
//       </View>


//       <View style={styles.root}>

//         <Text style={styles.Heading}>BarCode Designs</Text>

//         <View style={styles.buttonContainer}>

//           <TouchableOpacity
//             style={{
//               backgroundColor: 'red',
//               alignItems: 'center',
//               height: 45,
//               justifyContent: 'center',
//               borderRadius: 22,
//               width: '48%'
//             }}
//             onPress={handleScan}
//           >
//             {loader ? (
//               <ActivityIndicator />
//             ) : (
//               <Text style={{ color: 'white' }}>Scan</Text>
//             )}
//           </TouchableOpacity>


//           <TouchableOpacity
//             style={{
//               backgroundColor: 'grey',
//               alignItems: 'center',
//               height: 45,
//               justifyContent: 'center',
//               borderRadius: 22,
//               width: '48%'
//             }}
//             onPress={openImagePicker}>
//             <Text style={{ color: 'white' }}>Upload from gallery</Text>
//           </TouchableOpacity>


//         </View>
//         <View style={styles.textValue}>
//           <Text numberOfLines={2} style={{ marginVertical: 30 }} >QR Code Value: {loader1}</Text>
//           <Text > Text Length:{loader1.length}</Text>
//         </View>
//         {/* <QRCode
//           color='#6897bb'

//           enableLinearGradient
//           //  color={Colors.DARK_PURPLE}
//           value="Just some string value"
//           logo={logoFromFile}
//           logoSize={20}
//         // logoBorderRadius={15}
//         //logoBackgroundColor={'#ffff'}

//         // logoBackgroundColor='transparent'
//         /> */}
//         <QRCodeStyled
//           data={'QR code with logo'}
//           style={styles.svg}
//           padding={20}
//           pieceSize={8}
//           color={'#000'}
//           errorCorrectionLevel={'H'}
//           innerEyesOptions={{
//             borderRadius: 12,
//             color: '#000',
//           }}
//           outerEyesOptions={{
//             borderRadius: 12,
//             color: '#ffa114',
//           }}
//         // s logo={

//         //   {
//         //    href: require('./SVG_Logo.png'),
//         //     padding: 4,
//         //     scale: 0.8,

//         //     hidePieces: false,
//         //     // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
//         //   }
//         // }
//         />
//         <View style={styles.logoContainer}>
//           <Image

//             source={require('./barcodeComponents/logo.png')}
//             style={[styles.logo, {}]} />
//         </View>



//         <CirclePieces />
//         <DownloadQR />
//         <CustomEyes />
//         <CustomPieces />
//         <CustomPiecesAndEyes />
//         <LiquidPieces />
//         <QRCodeStyled
//           data={'QR with background'}
//           style={styles.svg}
//           padding={24}
//           pieceSize={8}
//           backgroundImage={{
//             href: require('./barcodeComponents/logo.png'),
//             // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
//           }}
//         />
//         <View style={{ paddingTop: 30, width: '90%' }}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter URL to Scan"
//             onChangeText={e => setUrl(e)}
//           />
//         </View>

//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({

//   wrapper: {
//     backgroundColor: 'red',
//     width: '80%',
//     height: 50,
//     marginVertical: 30,
//     borderRadius: 20,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   Heading: {
//     fontSize: 16,
//     fontWeight: '900',
//     color: '#ffff'

//   },
//   textValue: {
//     alignItems: 'center',
//     marginTop: 70,
//     paddingHorizontal: 24,
//   },
//   sectionContainer: {
//     //  backgroundColor: '#ffff',

//     alignItems: 'center',
//     marginTop: 70,
//     paddingHorizontal: 24,
//     marginBottom: 50,
//     width: '100%'

//   },

//   input: {
//     // backgroundColor: 'red',
//     width: '100%',
//     borderWidth: 0.5,
//     borderRadius: 5,
//     height: 40,
//     padding: 10,
//   },
//   buttonContainer: {
//     paddingTop: 20,
//     display: 'flex',

//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%'
//   },
//   root: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   svg: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   logoContainer: {
//     position: 'absolute',
//     width: 88,
//     height: 88,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: '90%',
//     height: '90%',
//     borderRadius: 20,
//     top: -2,

//   },
// });

// export default App;

