import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from "expo-image-picker";
import ModalEditImage from './components/ModalEditImage';


export default function App() {
  const camRef = useRef()
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('front');
  const [image, setImage] = useState();
  const [imageMirror, setImageMirror] = useState(-1);

  const [open, setOpen] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{textAlign:'center', color:'white', marginHorizontal: 16}}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Habilitar permissao da camera" />
      </View>
    );
  }

  async function pickImage(){
    let data = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    setImageMirror(1);

    if(!data.canceled){
      setImage(data.assets[0]);
      setOpen(true);
    }
  }

  async function takePhoto() {
    setImageMirror(facing === "front" ? -1 : 1); 
    if (camRef){
      let data = await camRef.current.takePicturesAsync();

      setImage(data);
      setOpen(true);
    }
  }

  function toggleFacing(){
    setFacing((current) => (current === 'front' ? 'back' : 'front'));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light " />
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={facing} ref={camRef}>

          <View style={styles.buttonContainer}>

            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <MaterialIcons size={36} name="collections" color={"white"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPhoto} onPress={takePhoto}>
              <View style={styles.buttonPhotoInterior}>  </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleFacing}>
              <MaterialIcons size={36} name="flip-camera-ios" color={"white"}/>
            </TouchableOpacity>

          </View>
        </CameraView>
      </View>

      {image && 
      <ModalEditImage 
        image ={image} 
        visible={open} 
        onClose={() => {setOpen(false);setImage(null);
        imageMirror={imageMirror}
        }}
      />}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0C0C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    overflow: "hidden",
  },
  camera:{
    width: "100%",
    height: "100%",
  },
  buttonContainer:{
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 32,
  },
  button:{
    width: 60,
    width: 60,
    backgroundColor: "black",
    opacity: 0.75,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "flex-end"
  },
  buttonPhoto:{
    width: 80,
    height: 80,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 100,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  },
  buttonPhotoInterior:{
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 100,
  }

});
