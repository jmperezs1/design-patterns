import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Modal, View, StyleSheet, Pressable, Text, Animated, Dimensions, Image, type ImageSourcePropType } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';

export type ZoomableImageProps = {
  source: ImageSourcePropType;
  style?: any;
  caption?: string;
};

export const ZoomableImage: React.FC<ZoomableImageProps> = ({ source, style, caption }) => {
  const [visible, setVisible] = useState(false);

  // Animated values for modal
  const pinchScale = useRef(new Animated.Value(1)).current;
  const baseScale = useRef(new Animated.Value(1)).current;
  const scale = useMemo(() => Animated.multiply(baseScale, pinchScale), [baseScale, pinchScale]);
  const lastScale = useRef(1);

  const transX = useRef(new Animated.Value(0)).current;
  const transY = useRef(new Animated.Value(0)).current;
  const lastX = useRef(0);
  const lastY = useRef(0);

  const onPinchEvent = useMemo(() => Animated.event([{ nativeEvent: { scale: pinchScale } }], { useNativeDriver: true }), [pinchScale]);
  const onPanEvent = useMemo(
    () => Animated.event([{ nativeEvent: { translationX: transX, translationY: transY } }], { useNativeDriver: true }),
    [transX, transY]
  );

  const onPinchStateChange = useCallback((evt: any) => {
    if (evt.nativeEvent.oldState === State.ACTIVE) {
      const next = lastScale.current * (evt.nativeEvent.scale || 1);
      lastScale.current = Math.max(1, Math.min(next, 5)); // clamp 1x-5x
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
    }
  }, [baseScale, pinchScale]);

  const onPanStateChange = useCallback((evt: any) => {
    if (evt.nativeEvent.oldState === State.ACTIVE) {
      lastX.current += evt.nativeEvent.translationX || 0;
      lastY.current += evt.nativeEvent.translationY || 0;
      transX.setOffset(lastX.current);
      transX.setValue(0);
      transY.setOffset(lastY.current);
      transY.setValue(0);
    }
  }, [transX, transY]);

  const reset = useCallback(() => {
    lastScale.current = 1;
    lastX.current = 0;
    lastY.current = 0;
    baseScale.setValue(1);
    pinchScale.setValue(1);
    transX.setValue(0);
    transX.setOffset(0);
    transY.setValue(0);
    transY.setOffset(0);
  }, [baseScale, pinchScale, transX, transY]);

  const close = useCallback(() => {
    reset();
    setVisible(false);
  }, [reset]);

  const win = Dimensions.get('window');

  return (
    <>
      <Pressable onPress={() => setVisible(true)} accessibilityRole="imagebutton" style={{ width: '100%' }}>
        <Image source={source} style={style} resizeMode="contain" />
      </Pressable>

      <Modal visible={visible} transparent={false} onRequestClose={close} animationType="fade">
        <View style={styles.modalRoot}>
          <View style={styles.topBar}>
            {caption ? <Text style={styles.caption}>{caption}</Text> : <View />}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable onPress={reset} style={styles.ctrlBtn} accessibilityRole="button">
                <Text style={styles.ctrlTxt}>Reset</Text>
              </Pressable>
              <Pressable onPress={close} style={[styles.ctrlBtn, styles.ctrlClose]} accessibilityRole="button">
                <Text style={[styles.ctrlTxt, { color: '#fff' }]}>Close</Text>
              </Pressable>
            </View>
          </View>

          <PanGestureHandler
            enabled={true}
            minDist={0}
            onGestureEvent={onPanEvent}
            onHandlerStateChange={onPanStateChange}
          >
            <Animated.View style={styles.gestureContainer} collapsable={false}>
              <PinchGestureHandler
                onGestureEvent={onPinchEvent}
                onHandlerStateChange={onPinchStateChange}
              >
                <Animated.Image
                  source={source}
                  resizeMode="contain"
                  style={[
                    { width: win.width, height: win.height - 64 },
                    {
                      transform: [
                        { translateX: transX },
                        { translateY: transY },
                        { scale },
                      ],
                    },
                  ]}
                />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalRoot: { flex: 1, backgroundColor: '#000' },
  topBar: {
    height: 56,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caption: { color: '#fff', fontWeight: '600' },
  ctrlBtn: { paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#222', borderRadius: 8 },
  ctrlClose: { backgroundColor: '#e11d48' },
  ctrlTxt: { color: '#ddd', fontWeight: '700' },
  gestureContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
