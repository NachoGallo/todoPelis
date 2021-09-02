import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DetailedMovie} from '../interfaces/movieDBInterface';
import {Cast} from '../interfaces/creditsInterface';
import currencyFormatter from 'currency-formatter';
import CastCard from './CastCard';
import {FlatList} from 'react-native-gesture-handler';

interface Props {
  detailedMovie: DetailedMovie;
  cast: Cast[];
}

const MovieDetals = ({detailedMovie, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            style={{marginRight: 5}}
            name="star-outline"
            size={20}
            color="gray"
          />
          <Text style={{color: 'black'}}>{detailedMovie.vote_average}</Text>
          <Text>
            {' '}
            - {detailedMovie.genres.map(genre => genre.name).join(', ')}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            marginBottom: 5,
            fontWeight: 'bold',
          }}>
          Historia
        </Text>

        <Text style={{fontSize: 15}}>{detailedMovie.overview}</Text>

        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            marginBottom: 5,
            fontWeight: 'bold',
          }}>
          Presupuesto
        </Text>

        <Text style={{fontSize: 15}}>
          {currencyFormatter.format(detailedMovie.budget, {code: 'USD'})}
        </Text>

        <Text
          style={{
            fontSize: 20,
            marginTop: 10,
            marginBottom: 5,
            fontWeight: 'bold',
          }}>
          Casting
        </Text>
      </View>
      <FlatList
        style={{marginTop: 10, height: 100}}
        data={cast}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CastCard actor={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default MovieDetals;
