import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './favorite.css';

function FavoritePage(props) {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    Axios.post('./api/favorite/getFavoriedMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then(res_data => {
      if (res_data.data.success) {
        setFavorites(res_data.data.favorite);
      } else {
        alert('영화 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <th>Remove from favorites</th>
          </tr>
        </thead>
        <tbody>
          {Favorites.map((favorite, idx) => (
            <tr key={idx}>
              <td>{favorite.movieTitle}</td>
              <td>{favorite.movieRunTime} mins</td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
