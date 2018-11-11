import L from 'leaflet'
export const start = new L.Icon({
  iconUrl: require('./icons/start.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

export const finish = new L.Icon({
  iconUrl: require('./icons/finish.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

const business = new L.Icon({
  iconUrl: require('./icons/business.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

const bicycle = new L.Icon({
  iconUrl: require('./icons/bicycle.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

const campSite = new L.Icon({
  iconUrl: require('./icons/tent.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

const hut = new L.Icon({
  iconUrl: require('./icons/hut.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

const town = new L.Icon({
  iconUrl: require('./icons/town.svg'),
  iconSize: new L.Point(30, 35),
  className: null
})

export default function findIcon(type) {
  switch (type) {
    case 'start':
      return start
    case 'finish':
      return finish
    case 'business':
      return business
    case 'bicycle':
      return bicycle
    case 'campsite':
      return campSite
    case 'hut':
      return hut
    case 'town':
      return town
    default:
      return campSite
  }
}
