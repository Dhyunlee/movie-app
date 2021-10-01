import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Favorite({ moviedId, userFrom, movieInfo }) {
  const { title: movieTitle, runtime: movieRunTime } = movieInfo;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom,
      moviedId,
    };

    Axios.post('/api/favorite/favoriteNumber', variables)
        .then(res_data => {
            setFavoriteNumber(res_data.data.favoriteNumber)
            if (res_data.data.success) {
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.');
             }
        });

    Axios.post('/api/favorite/favorited', variables)
        .then(res_data => {
            setFavorited(res_data.data.favorited)
            if (res_data.data.success) {
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.');
            }
        });
    }, []);
  return <button>{ Favorited? 'Not Favorite': 'Add to Favorite'} {FavoriteNumber}</button>;
}

export default Favorite;
