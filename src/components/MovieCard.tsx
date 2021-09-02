import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../interfaces/movieDBInterface';
import DetailScreen from '../screens/DetailScreen';

interface Props {
  movie: Movie;
  height?: number;
  width?: number;
}

const MovieCard = ({movie, height = 420, width = 300}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailScreen' as never, movie as never)
      }
      activeOpacity={0.9}
      style={{width, height, marginHorizontal: 5}}>
      <View style={styles.imageContainer}>
        <Image source={{uri}} style={styles.card} />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
  },

  imageContainer: {
    borderRadius: 18,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 6,
  },
});
