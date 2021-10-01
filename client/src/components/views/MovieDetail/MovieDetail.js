import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
    let moviedId = props.match.params.moviedId;
    const [Movie, setMovie] = useState([]);

    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${moviedId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${moviedId}?api_key=${API_KEY}`;
        fetch(endpointInfo)
            .then(res => res.json())
            .then(res_data => setMovie(res_data))

    }, [])
    return (
        <div> 
            {/* Header */}

          <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
          />   

            {/* Body */}
            <div style={{width: '85%', margin: '1rem auth'}}>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>


                <br/>
                {/* Actors Grid */}
                <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button>Toggle Actor View</button>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;