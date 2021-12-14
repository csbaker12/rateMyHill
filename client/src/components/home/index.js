import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResorts } from '../../store/actions/resort_actions';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './home.css';
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import { useNavigate } from 'react-router-dom';
import { clearResort, clearReviews } from '../../store/actions';

mapboxgl.accessToken =
  'pk.eyJ1IjoiY3NiYWtlciIsImEiOiJja3ZzaDFpMTM0cWM1MndudWh2bjJzZWI0In0.fNijPQVS2u-T7DZw28EH2A';

let resortRating = 0;
let geojsonFeature = {};
let geojson = {
  type: 'FeatureCollection',
  features: [],
  id: '',
};

const navControlStyle = {
  right: 10,
  top: 10,
};

const Home = () => {
  const lng = -104.9688638;
  const lat = 39.7057824;
  const zoom = 9;
  const [viewport, setViewport] = useState({
    longitude: lng,
    latitude: lat,
    zoom: zoom,
  });
  const [loaded, setLoaded] = useState(false);

  let resorts = useSelector((state) => state.resorts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resorts && !resorts.resortList) {
      dispatch(getResorts());
    }
    dispatch(clearResort());
    dispatch(clearReviews());
  }, []);

  useEffect(() => {
    if (resorts.resortList) {
      createData(resorts.resortList.resorts);
    }
  }, [resorts.resortList]);

  const createData = (resorts) => {
    for (let i = 0; i < resorts.length; i++) {
      if (resorts[i].isActive) {
        geojsonFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [resorts[i].longitude, resorts[i].latitude],
          },
          properties: { title: resorts[i].name, rating: resortRating },
          id: resorts[i]._id,
        };
        geojson.features.push(geojsonFeature);
      }
    }

    setLoaded(true);
  };
  let activeResort = {};

  const showResortData = (item) => {
    console.log(item);
    activeResort = item;
    navigate(`/resort/${item.id}`);
  };

  return (
    <>
      {loaded ? (
        <div>
          <ReactMapGL
            {...viewport}
            width='100%'
            height='900px'
            onViewportChange={setViewport}
            mapboxApiAccessToken={mapboxgl.accessToken}
            mapStyle='mapbox://styles/mapbox/streets-v11'>
            {geojson.features.map((item) => (
              <Marker
                key={item.properties.title}
                longitude={item.geometry.coordinates[0]}
                latitude={item.geometry.coordinates[1]}
                onClick={() => showResortData(item)}>
                <div className='marker'>
                  <div className='markertitle'>{item.properties.title}</div>
                </div>
              </Marker>
            ))}
            <NavigationControl style={navControlStyle} />
          </ReactMapGL>
        </div>
      ) : null}
    </>
  );
};
export default Home;
