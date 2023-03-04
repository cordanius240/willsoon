

/*
import React, { useState, useRef } from 'react';
import { Modal, View, StyleSheet, PanResponder } from 'react-native';

const PopupPage = ({ visible, onCloseRequest, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [panResponder, setPanResponder] = useState(PanResponder.create({}));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const prepopupRef = useRef(null);

  const onLayout = (event) => {
    setDimensions(event.nativeEvent.layout);
  };

  const handleMove = (_, gestureState) => {
    const { dy } = gestureState;
    const newPosition = { x: 0, y: position.y + dy };

    // Only move popup page within its container
    if (newPosition.y >= 0 && newPosition.y + dimensions.height <= window.innerHeight) {
      setPosition(newPosition);
    }
  };

  const handleRelease = (_, gestureState) => {
    const { dy } = gestureState;

    // If the popup page is swiped down, close it
    if (dy > 100) {
      onCloseRequest();
    }
  };

  const handleStartShouldSetPanResponder = () => {
    return true;
  };

  const handleMoveShouldSetPanResponder = () => {
    return true;
  };

  const handlePanResponderGrant = () => {
    // Disable background scroll when the popup page is open
    setIsOpen(true);
  };

  const handlePanResponderEnd = () => {
    // Enable background scroll when the popup page is closed
    setIsOpen(false);
  };

  // Initialize pan responder
  const initializePanResponder = () => {
    setPanResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
        onPanResponderGrant: handlePanResponderGrant,
        onPanResponderMove: handleMove,
        onPanResponderRelease: handleRelease,
        onPanResponderTerminate: handleRelease,
        onPanResponderEnd: handlePanResponderEnd,
      })
    );
  };

  // Initialize pan responder on mount
  React.useEffect(() => {
    initializePanResponder();
  }, []);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onCloseRequest}>
      <View style={styles.modal}>
        <View style={styles.prepopup} ref={prepopupRef} onLayout={onLayout} {...panResponder.panHandlers}>
          <View style={styles.blackStrip} />
          <View style={[styles.popup, { transform: [{ translateY: position.y }] }]}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prepopup: {
    width: '100%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    top: '5%',
    overflow: 'hidden',
  },
  blackStrip: {
    height: 4,
    backgroundColor: '#000',
    width: 40,
    position: 'absolute',
    top: '1%',
    left: '50%',
    marginTop: -1,
    marginLeft: -20,
    borderRadius: 5,
  },
  popup: {
    width: '100%',
    height: '98%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    top: '2%',
    overflow: 'hidden',
  },
});

export default PopupPage;
*/

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal } from 'react-native-paper';


const PopupPage = ({ visible, onCloseRequest, children }) => {

  return (
    <Modal
      animationType="slide"
      onDismiss={onCloseRequest}
      visible={visible}
      contentContainerStyle={styles.prepopup}
    >
      <View style={styles.blackStrip} />
      <View style={styles.popup}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prepopup: {
    width: '30%',
    height: '99%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    overflow: 'hidden',
  },
  blackStrip: {
    height: 4,
    backgroundColor: '#000',
    width: 40,
    position: 'absolute',
    top: '1%',
    left: '50%',
    marginTop: -1,
    marginLeft: -20,
    borderRadius: 5,
  },
  popup: {
    width: '100%',
    height: '98%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    top: '2%',
    overflow: 'hidden',
  },
});

export default PopupPage;

/*
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

const PopupPage = ({ visible, onCloseRequest, children }) => {
  
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCloseRequest}
        >
          <View style={styles.modal}>
              <View style={styles.prepopup}>
                <View style={styles.blackStrip} />
                <View style={styles.popup}>
                  {children}
                </View>
              </View>
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prepopup: {
    width: '100%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    top: '5%',
    overflow: 'hidden',
  },
  blackStrip: {
    height: 4,
    backgroundColor: '#000',
    width: 40,
    position: 'absolute',
    top: '1%',
    left: '50%',
    marginTop: -1,
    marginLeft: -20,
    borderRadius: 5,
  },
  popup: {
    width: '100%',
    height: '98%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    top: '2%',
    overflow: 'hidden',
  },
});

export default PopupPage;
*/