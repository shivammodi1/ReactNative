import { View, Button, StyleSheet, Modal, Text } from 'react-native'
import React, { useState } from 'react'
import ReactNativeModal from 'react-native-modal'

const Model = () => {

  // state for normal modal
  const [showModal, setShowModal] = useState(false)

  // state for react-native-modal
  const [showRNModal, setShowRNModal] = useState(false)

  return (
    <View style={styles.container}>
      
      {/* Button → Open Normal Modal */}
      <Button 
        title="Open Normal Modal"
        onPress={() => setShowModal(true)}
      />

      {/* Button → Open React Native Modal */}
      <Button 
        title="Open RN Modal"
        onPress={() => setShowRNModal(true)}
      />

      {/* ================= NORMAL MODAL ================= */}
      {/* Built-in React Native Modal */}
      <Modal 
        visible={showModal} // controls visibility
        animationType="slide" // animation
        transparent={true} // background transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text>Normal Modal 🚀</Text>

            {/* Close button */}
            <Button 
              title="Close"
              onPress={() => setShowModal(false)}
            />
          </View>
        </View>
      </Modal>


      {/* ================= REACT NATIVE MODAL ================= */}
      {/* External library modal */}
      <ReactNativeModal 
        isVisible={showRNModal} // controls visibility
        onBackdropPress={() => setShowRNModal(false)} // click outside to close
        onBackButtonPress={() => setShowRNModal(false)} // Android back button
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text>React Native Modal 😎</Text>

            {/* Close button */}
            <Button 
              title="Close"
              onPress={() => setShowRNModal(false)}
            />
          </View>
        </View>
      </ReactNativeModal>

    </View>
  )
}

export default Model

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalBox: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }

});