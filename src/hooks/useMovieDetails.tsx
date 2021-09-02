import {useState, useEffect} from 'react';
import movieDB from '../api/movieDB';
import {Cast, CreditsResponse} from '../interfaces/creditsInterface';
import {DetailedMovie} from '../interfaces/movieDBInterface';
interface MovieDetails {
  isLoading: boolean;
  cast: Cast[];
  detailedMovie?: DetailedMovie;
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    cast: [],
    detailedMovie: undefined,
  });

  const getMovieDetails = async () => {
    //Detailed Movie
    const detailedMoviePromise = movieDB.get<DetailedMovie>(`/${movieId}`);

    //Credits.
    const creditsPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

    const [movieDetailsResp, castPromiseResp] = await Promise.all([
      detailedMoviePromise,
      creditsPromise,
    ]);

    setState({
      isLoading: false,
      detailedMovie: movieDetailsResp.data,
      cast: castPromiseResp.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {...state};
};
