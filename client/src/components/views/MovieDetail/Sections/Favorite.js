import React, { useEffect } from 'react';
import Axios from 'axios';

function Favorite({ moviedId, userFrom, movieInfo }) {
  const { title: movieTitle, runtime: movieRunTime } = movieInfo;

  useEffect(() => {
    let variables = {
      userFrom,
      moviedId,
    };

    Axios.post('/api/favorte/favorteNumber', variables).then(res_data => {
      console.log(res_data.data);
      if (res_data.data.success) {
      } else {
        alert('숫자 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);
  return <button>Favorite</button>;
}

export default Favorite;
