import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Widget from '../../../../components/Widget';

import s from './Google.module.scss';

class Maps extends React.Component {

  render() {
    return (
      <div>
        <h1 className="page-title">
          Google <span className="fw-semi-bold">Maps</span>
        </h1>
        <Widget
          title={<h4>Google Maps <small className="text-muted">Default and customized</small></h4>}
          collapse close
        >
          <div className={s.MapContainer}>
            <LoadScript googleMapsApiKey="AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg">
              <GoogleMap mapContainerStyle={{ height: 'inherit', width: 'inherit' }} zoom={12}
                center={{ lat: -37.813179, lng: 144.950259 }}>
                <Marker position={{ lat: -37.813179, lng: 144.950259 }} />
              </GoogleMap>
            </LoadScript>
          </div>
        </Widget>
      </div>);
  }

}

export default Maps;
