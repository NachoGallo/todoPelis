import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Cast} from '../interfaces/creditsInterface';

interface Props {
  actor: Cast;
}

const CastCard = ({actor}: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor.profile_path}`;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {actor.profile_path && <Image source={{uri}} style={styles.image} />}
      </View>
      <View>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{actor.name}</Text>
        <Text style={{fontSize: 16, color: 'gray'}}>{actor.character}</Text>
      </View>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 6,
    marginBottom: 20,
    marginHorizontal: 8,
    borderRadius: 10,
  },

  imageContainer: {
    height: 80,
    width: 70,
  },

  image: {
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
  },
});
