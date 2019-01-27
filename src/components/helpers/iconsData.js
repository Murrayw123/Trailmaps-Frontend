import L from "leaflet";
export const start = new L.Icon({
  iconUrl: require("./icons/start.svg"),
  iconSize: new L.Point(30, 35),
  className: null
});

export const finish = new L.Icon({
  iconUrl: require("./icons/finish.svg"),
  iconSize: new L.Point(30, 35),
  className: null
});

const business = new L.Icon({
  iconUrl: require("./icons/business.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const bicycle = new L.Icon({
  iconUrl: require("./icons/bicycle.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const walking = new L.Icon({
  iconUrl: require("./icons/hiking.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

const campSite = new L.Icon({
  iconUrl: require("./icons/tent.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

const hut = new L.Icon({
  iconUrl: require("./icons/hut.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

const town = new L.Icon({
  iconUrl: require("./icons/town.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

const water = new L.Icon({
  iconUrl: require("./icons/water.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

const attraction = new L.Icon({
  iconUrl: require("./icons/attraction.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

const vehicle = new L.Icon({
  iconUrl: require("./icons/vehicle.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const selected = new L.Icon({
  iconUrl: require("./icons/selected.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const cafe = new L.Icon({
  iconUrl: require("./icons/cafe.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const restaurant = new L.Icon({
  iconUrl: require("./icons/food.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const lighthouse = new L.Icon({
  iconUrl: require("./icons/lighthouse.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const picnicArea = new L.Icon({
  iconUrl: require("./icons/picnic.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const pub = new L.Icon({
  iconUrl: require("./icons/pub.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const warning = new L.Icon({
  iconUrl: require("./icons/warning.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const taxi = new L.Icon({
  iconUrl: require("./icons/taxi.svg"),
  iconSize: new L.Point(25, 30),
  className: null
});

export const rider = new L.Icon({
    iconUrl: require("./icons/rider.svg"),
    iconSize: new L.Point(25, 30),
    className: null
});

export const hiker = new L.Icon({
    iconUrl: require("./icons/hiker.svg"),
    iconSize: new L.Point(25, 30),
    className: null
});

export function findIcon(type) {
  switch (type) {
    case "start":
      return start;
    case "finish":
      return finish;
    case "business":
      return business;
    case "bicycle":
      return bicycle;
    case "campsite":
      return campSite;
    case "hut":
      return hut;
    case "town":
      return town;
    case "water":
      return water;
    case "attraction":
      return attraction;
    case "vehicle":
      return vehicle;
    case "cafe":
      return cafe;
    case "restaurant":
      return restaurant;
    case "lighthouse":
      return lighthouse;
    case "picnic_area":
      return picnicArea;
    case "pub":
      return pub;
    case "warning":
      return warning;
    case "taxi":
      return taxi;
    case "cyclist":
          return rider;
    case "hiker":
          return hiker;
    default:
      return attraction;
  }
}

export const food_groupings = ["restaurant", "pub", "cafe"];
export const business_groupings = ["taxi"];
