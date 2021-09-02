import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../navigations/Navigation';
import {useMovieDetails} from '../hooks/useMovieDetails';
import MovieDetals from '../components/MovieDetals';
import {useNavigation} from '@react-navigation/native';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {}

const {height: screenHeight} = Dimensions.get('screen');

const DetailScreen = ({route, navigation}: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const {cast, isLoading, detailedMovie} = useMovieDetails(movie.id);

  return (
    <ScrollView>
      <View>
        <View style={styles.posterContainer}>
          <Image source={{uri}} style={styles.posterImage} />
        </View>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.originalTitle}>{movie.original_title}</Text>
        <Text style={styles.espTitle}>{movie.title}</Text>
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator color="green" size={30} style={{marginTop: 30}} />
        ) : (
          <MovieDetals detailedMovie={detailedMovie!} cast={cast} />
        )}
      </View>

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={40} color="green" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  posterContainer: {
    height: screenHeight * 0.6,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 10,

    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },

  posterImage: {
    flex: 1,
  },

  dataContainer: {
    marginTop: 15,
    marginHorizontal: 10,
  },

  originalTitle: {
    fontSize: 15,
    color: 'gray',
  },

  espTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  backButton: {
    position: 'absolute',
    zIndex: 100,
    elevation: 100,
    top: 5,
    left: 5,
  },
});
