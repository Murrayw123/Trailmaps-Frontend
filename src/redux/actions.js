export const FETCH_DATA_BEGIN = 'FETCH_PRODUCTS_BEGIN'
export const FETCH_DATA_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_DATA_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const ADD_MAP_MARKER = 'ADD_MAP_MARKER'
export const CALC_DISTANCE = 'CALC_DISTANCE'
export const CALC_ELEVATION = 'CALC_ELEVATION'

export function fetchData() {
  return dispatch => {
    dispatch(fetchDataBegin())
    return fetch('http://5b9649ec52764b001413bc29.mockapi.io/api/TrailMaps')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDataSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchDataError(error)))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN
})

export const fetchDataSuccess = initMapInfo => ({
  type: FETCH_DATA_SUCCESS,
  payload: { initMapInfo }
})

export const fetchDataError = error => ({
  type: FETCH_DATA_FAILURE,
  payload: { error }
})

export const addMapMarker = marker => ({
  type: ADD_MAP_MARKER,
  payload: marker
})

export const storeDistance = marker => ({
  type: CALC_DISTANCE,
  payload: marker
})

export const storeElevation = marker => ({
  type: CALC_ELEVATION,
  payload: marker
})
