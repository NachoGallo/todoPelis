import React from 'react';
import {Dimensions, Text} from 'react-native';
import {View, ActivityIndicator} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';

const {width: windowWidth} = Dimensions.get('window');

const HomeScreen = () => {
  const {nowPlaying, popular, topRated, upcoming, isLoading} = useMovies();
  const {top} = useSafeAreaInsets();

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator color="green" size={50} />
      </View>
    );

  return (
    <ScrollView>
      <View style={{marginTop: top + 20}}>
        {/* Carrousel Principal */}
        <View style={{height: 450}}>
          <Carousel
            data={nowPlaying!}
            renderItem={({item}: any) => <MovieCard movie={item} />}
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>

        {/* Peliculas Populares */}
        <HorizontalSlider title="Populares" movie={popular!} />
        <HorizontalSlider title="Top Rated" movie={topRated!} />
        <HorizontalSlider title="Próximas!" movie={upcoming!} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
