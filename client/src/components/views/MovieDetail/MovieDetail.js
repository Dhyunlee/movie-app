import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import Favorite from './Sections/Favorite';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
  let moviedId = props.match.params.moviedId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${moviedId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${moviedId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then(res => res.json())
      .then(res_data => {
        setMovie(res_data);
      });

    fetch(endpointCrew)
      .then(res => res.json())
      .then(res_data => setCasts(res_data.cast));
  }, []);

  const ToggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}

      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />

      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Favorite 
              movieInfo={Movie} 
              moviedId={moviedId}
              userFrom={localStorage.getItem('userId')}
            />
        </div>
       
        {/* Movie Info */}
        <MovieInfo movie={Movie} />

        <br />
        {/* Actors Grid */}

        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
        >
          <button onClick={ToggleActorView}>Toggle Actor View</button>
        </div>

        {/* Casts */}
        {ActorToggle && (
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, idx) => (
                <React.Fragment key={idx}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
