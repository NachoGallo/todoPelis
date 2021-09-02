import React from 'react';
import {View, Text} from 'react-native';
import {Movie} from '../interfaces/movieDBInterface';
import {FlatList} from 'react-native-gesture-handler';
import MovieCard from './MovieCard';

interface Props {
  title?: string;
  movie: Movie[];
}

const HorizontalSlider = ({title, movie}: Props) => {
  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text style={{fontSize: 23, fontWeight: 'bold', marginLeft: 5}}>
          {title}
        </Text>
      )}

      <View style={{paddingTop: 15, height: 230}}>
        <FlatList
          data={movie}
          renderItem={({item}: any) => (
            <MovieCard movie={item} width={140} height={200} />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HorizontalSlider;
