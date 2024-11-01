import React from 'react';
import {Modal, StyleSheet, Dimensions, Pressable} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

interface SlideModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const HEIGHT = Dimensions.get('window').height;

export default function SlideModal({
  visible,
  onClose,
  children,
}: SlideModalProps) {
  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.modalContainer}>{children}</Pressable>
        </Pressable>
      </Modal>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: HEIGHT * 0.3,
  },
});
