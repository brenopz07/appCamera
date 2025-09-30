import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';

export default function StickerPicker({isVisible, onClose, onSelect}) {
  const [stickers] = useState([
    require('../assets/stickers/emoji1.png')
  ]);

  

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      {/* View do Modal inteiro */}
      <View style={styles.modal}>
        {/* Título */}
        <View style={styles.titleContainer}>
          {/* Texto do título */}
          <Text style={styles.title}>Escolha um sticker</Text>
          {/* Botão de fechar modal */}
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons size={22} name="close" color={'white'} />
          </TouchableOpacity>
        </View>

        {/* Lista de stickers */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.stickersContainer}>
            {stickers.map((sticker, index) => {
                return (
                <TouchableOpacity key={index} onPress={() => {
                    onSelect(sticker); 
                    onClose();
                    }}
                    >
                    <Image  source={sticker} key={index} style={styles.stickers}/>
                </TouchableOpacity>
                );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "75%",
    width: "100%",
    backgroundColor:"#0C0C0C",
    opacity: 0.9,
    bottom: 0,
    position:'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 32,
  },
  titleContainer:{
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title:{
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  stickersContainer:{
    flexDirection:"row",
    flexWrap:"wrap",
    flex: 1,
    justifyContent:"space-between",
  },
  stickers:{
    width:90,
    height:90,
    objectFit:"container",
    marginVertical: 8,
  },
});