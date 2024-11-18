import React from 'react';
import {Modal, StyleSheet, Dimensions, Pressable, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {colors} from '../../constants/colors';
import useThemeStorage from '../../hook/useThemeStorage';
import {ThemeMode} from '../../types/common';

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
  const {theme} = useThemeStorage();
  const styles = styling(theme);
  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.modalContainer}>
            <View style={styles.modalHeadLine} />
            {children}
          </Pressable>
        </Pressable>
      </Modal>
    </GestureRecognizer>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: colors[theme].WHITE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 15,
      minHeight: HEIGHT * 0.33,
    },
    modalHeadLine: {
      width: 100,
      height: 4,
      backgroundColor: colors[theme].MAIN,
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 10,
    },
  });
