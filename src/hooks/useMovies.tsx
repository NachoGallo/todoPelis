import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {MovieDBMoviesResponse, Movie} from '../interfaces/movieDBInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>();

  const getMovies = async () => {
    //En cine
    const nowPlayingPromise =
      movieDB.get<MovieDBMoviesResponse>('/now_playing');

    //Populares
    const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');

    //Top Rated
    const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');

    //Proximas
    const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

    const response = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: response[0].data.results,
      popular: response[1].data.results,
      topRated: response[2].data.results,
      upcoming: response[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {...moviesState, isLoading};
};

export default useMovies;
