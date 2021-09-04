import React, { useContext } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';
import { useFade } from '../hooks/useFade';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const GradientBackground = ({ children }: Props) => {
  const { colors, previousColors, setPrevColors } = useContext(GradientContext);
  const { fadeIn, fadeOut, opacity } = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevColors(colors);
      fadeOut();
    });
  }, [colors]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[previousColors.primary, previousColors.secondary, 'white']}
        style={{ ...(StyleSheet.absoluteFill as {}) }} //Como daba error el spread, le agregue el `as {}`
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.5, y: 0.7 }}
      />
      <Animated.View style={{ ...(StyleSheet.absoluteFill as any), opacity }}>
        <LinearGradient
          colors={[colors.primary, colors.secondary, 'white']}
          style={{ ...(StyleSheet.absoluteFill as {}) }} //Como daba error el spread, le agregue el `as {}`
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.7 }}
        />
      </Animated.View>

      {children}
    </View>
  );
};

export default GradientBackground;
