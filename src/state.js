import React, { createContext, useContext, useReducer } from 'react';

import config from './config';

const markers = []

const ubicacionesToMarker = (ubicaciones) => {
  ubicaciones.forEach(({id, coordenada, nombre, vectores }) => {
    markers.push({
      id,
      city: nombre,
      vectores,
      value: vectores.length,
      coordinates: [coordenada.latitud, coordenada.longitud],
    })
  })
}

fetch('http://localhost:8080/ubicacion/all')
  .then(response => response.json())
  .then(ubicaciones => {
    ubicacionesToMarker(ubicaciones);
  });

export const initialState = {
  config,
  focusedMarker: null,
  hasLoaded: false,
  lastUpdated: {},
  markers: markers,
  relatedTopics: {},
  start: false,
};

export function reducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case 'LOADED':
      return {
        ...state,
        hasLoaded: true,
      };
    case 'START':
      return {
        ...state,
        start: true,
      };
    case 'FOCUS':
      return {
        ...state,
        focusedMarker: payload,
      };
    default:
      return state;
  }
}

const StateContext = createContext(null);

export function StateProvider({ children, initialState, reducer }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateValue() {
  return useContext(StateContext);
}
