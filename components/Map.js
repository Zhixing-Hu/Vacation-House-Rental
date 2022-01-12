import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import * as React from 'react';
import getCenter from 'geolib/es/getCenter';
import { useState } from 'react/cjs/react.development';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({});
    // Transform the search results object into the { atitude: 51.5103, longitude: 7.49347 } object
    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }))
    const center = getCenter(coordinates);
    const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
        latitude: (center.latitude-.15),
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL 
            mapStyle='mapbox://styles/kennyhu/ckyc0zgpg34fn14o10unhlb80' 
            mapboxApiAccessToken='pk.eyJ1Ijoia2VubnlodSIsImEiOiJja3ljMHV3dWcwa21mMnZzMGY2OTgwZDJwIn0.OvBAYHI0GNTKeq_cBaUMZg'
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={() => setSelectedLocation(result)} className='cursor-pointer text-2xl animate-bounce' aira-aria-label='push-pin'>
                            📍
                        </p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup className='bg-gray-500'
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                            <p className='font-semibold text-sm'>{result.title}</p>
                        </Popup>
                    ):(
                        false
                    )}

                </div>
            ))}

        </ReactMapGL>
    );
}

export default Map
