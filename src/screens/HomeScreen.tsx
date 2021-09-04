import React, { useContext } from 'react';
import { Dimensions, Text } from 'react-native';
import { View, ActivityIndicator } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import HorizontalSlider from '../components/HorizontalSlider';
import MovieCard from '../components/MovieCard';
import useMovies from '../hooks/useMovies';
import GradientBackground from '../components/GradientBackground';
import ImageColors from 'react-native-image-colors';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';
import { useEffect } from 'react';

const { width: windowWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const { top } = useSafeAreaInsets();
  const { setMainColors, setPrevColors } = useContext(GradientContext);

  const getPosterColors = async (index: number) => {
    const movie = nowPlaying![index];
    const uri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    const [primary = 'green', secondary = 'orange'] = await getImageColors(uri);

    setMainColors({ primary, secondary });
  };

  useEffect(() => {
    if (nowPlaying?.length! > 0) getPosterColors(0);
  }, [nowPlaying]);

  if (isLoading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <ActivityIndicator color="green" size={50} />
      </View>
    );

  return (
    <GradientBackground>
      <ScrollView>
        <View style={{ marginTop: top + 20 }}>
          {/* Carrousel Principal */}
          <View style={{ height: 450 }}>
            <Carousel
              data={nowPlaying!}
              renderItem={({ item }: any) => <MovieCard movie={item} />}
              sliderWidth={windowWidth}
              itemWidth={300}
              inactiveSlideOpacity={0.9}
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>

          {/* Peliculas Populares */}
          <HorizontalSlider title="Populares" movie={popular!} />
          <HorizontalSlider title="Top Rated" movie={topRated!} />
          <HorizontalSlider title="Próximas!" movie={upcoming!} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default HomeScreen;
