import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite({ moviedId, userFrom, movieInfo }) {
  const {
    title: movieTitle,
    backdrop_path: moviePost,
    runtime: movieRunTime,
  } = movieInfo;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    moviedId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    Axios.post('/api/favorite/favoriteNumber', variables).then(response => {
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        alert('숫자 정보를 가져오는데 실패 했습니다.');
      }
    });

    Axios.post('/api/favorite/favorited', variables).then(response => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert('정보를 가져오는데 실패 했습니다.');
      }
    });
  }, []);

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables).then(
        res_data => {
          if (res_data.data.success) {
            console.log(res_data.data)
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite 리스트에서 지우는 걸 실패했습니다.');
          }
        }
      );
    } else {
      Axios.post('/api/favorite/addToFavorite', variables).then(res_data => {
        if (res_data.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('Favorite 리스트에서 추가하는 걸 실패했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onClickFavorite}>
        {Favorited ? ' Not Favorite' : 'Add to Favorite '} {FavoriteNumber}{' '}
      </Button>
    </div>
  );
}

export default Favorite;
