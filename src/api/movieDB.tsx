import Axios from 'axios';

const movieDB = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'c2e9fe29762df39e4bc8939b225dd859',
    language: 'es-ES',
  },
});

export default movieDB;
