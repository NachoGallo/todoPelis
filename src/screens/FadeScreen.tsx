import React, { useRef } from 'react';
import { StyleSheet, Text, View, Animated, Button } from 'react-native';
import { useFade } from '../hooks/useFade';

const FadeScreen = () => {
  const { opacity, fadeIn, fadeOut } = useFade();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          backgroundColor: '#084F6A',
          width: 150,
          height: 150,
          borderColor: 'white',
          borderWidth: 10,
          opacity: opacity,
        }}
      ></Animated.View>
    </View>
  );
};

export default FadeScreen;

const styles = StyleSheet.create({});
