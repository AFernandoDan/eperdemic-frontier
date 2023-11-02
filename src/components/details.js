import React, {useEffect} from 'react';

import { useStateValue } from '../state';
import Button from './button';
import Fade from './fade';
import UbicacionVectores from "./UbicacionVectores";

function getSearchUrl(city, country, keyword) {
  const formattedQuery = `${encodeURIComponent(city)}, ${encodeURIComponent(
    country,
  )} ${encodeURIComponent(keyword)}`.replace(/(%20| )/g, '+');
  return `https://www.google.com/search?q=${formattedQuery}`;
}

export function getRandomMarker({ focusedMarker, markers }) {
  const filteredMarkers = markers.filter((marker) => {
    return marker.id !== focusedMarker?.id;
  });
  return filteredMarkers[Math.floor(Math.random() * filteredMarkers.length)];
}

export default function Details() {
  const [
    { config, focusedMarker, markers, relatedTopics },
    dispatch,
  ] = useStateValue();
  const randomMarker = getRandomMarker({ focusedMarker, markers });

  let content;

  if (focusedMarker) {
    const { city, countryCode, countryName, value, vectores } = focusedMarker;

    content = (
      <>
        <div className="header">
          <Button
            label="Back to globe"
            onClick={() => dispatch({ type: 'FOCUS' })}
          />
          <Button
            label="Random City"
            onClick={() => dispatch({ type: 'FOCUS', payload: randomMarker })}
          />
        </div>
        <div className="content">
          <h2>
            {city} ({value})
          </h2>
          <div className="details-content">
            <UbicacionVectores vectores={vectores}/>
          </div>
          <Button
            label="View search results"
          />
        </div>
      </>
    );
  }

  return (
    <Fade className="details" show={focusedMarker}>
      {content}
    </Fade>
  );
}
