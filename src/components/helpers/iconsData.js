import L from "leaflet";
import townI from "./icons/town.svg";
import finishI from "./icons/finish.svg"
import businessI from "./icons/business.svg"
import bicycleI from "./icons/bicycle.svg"
import hikingI from "./icons/hiking.svg"
import tentI from "./icons/tent.svg"
import hutI from "./icons/hut.svg"
import waterI from "./icons/water.svg"
import attractionI from "./icons/attraction.svg"
import vehicleI from "./icons/vehicle.svg"
import selectedI from "./icons/selected.svg"
import cafeI from "./icons/cafe.svg"
import foodI from "./icons/food.svg"
import lighthouseI from "./icons/lighthouse.svg"
import picnicI from "./icons/picnic.svg"
import pubI from "./icons/pub.svg"
import warningI from "./icons/warning.svg"
import taxiI from "./icons/taxi.svg"
import riderI from "./icons/rider.svg"
import hikerI from "./icons/hiker.svg"
import startI from "./icons/start.svg"

export const markerChoices = [
  { id: "taxi", name: "Taxi Service" },
  { id: "campsite", name: "Campsite" },
  { id: "hut", name: "Hut/Shelter" },
  { id: "town", name: "Town" },
  { id: "water", name: "Water" },
  { id: "attraction", name: "Tourist Attraction / Point of Interest" },
  { id: "vehicle", name: "Vehicle Access Point" },
  { id: "cafe", name: "Cafe" },
  { id: "pub", name: "Pub" },
  { id: "restaurant", name: "Restaurant" },
  { id: "lighthouse", name: "Lighthouse" },
  { id: "picnic_area", name: "Picnic Area" },
  { id: "warning", name: "Warning" },
];

export const start = new L.Icon({
  iconUrl: startI ,
  iconSize: new L.Point(30, 35),
  className: null,
});

export const finish = new L.Icon({
  iconUrl: finishI,
  iconSize: new L.Point(30, 35),
  className: null,
});

const business = new L.Icon({
  iconUrl: businessI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const bicycle = new L.Icon({
  iconUrl: bicycleI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const walking = new L.Icon({
  iconUrl: hikingI,
  iconSize: new L.Point(25, 30),
  className: null,
});

const campSite = new L.Icon({
  iconUrl: tentI,
  iconSize: new L.Point(25, 30),
  className: null,
});

const hut = new L.Icon({
  iconUrl: hutI,
  iconSize: new L.Point(25, 30),
  className: null,
});

const town = new L.Icon({
  iconUrl: townI,
  iconSize: new L.Point(25, 30),
  className: null,
});

const water = new L.Icon({
  iconUrl: waterI,
  iconSize: new L.Point(25, 30),
  className: null,
});

const attraction = new L.Icon({
  iconUrl: attractionI,
  iconSize: new L.Point(25, 30),
  className: null,
});

const vehicle = new L.Icon({
  iconUrl: vehicleI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const selected = new L.Icon({
  iconUrl: selectedI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const cafe = new L.Icon({
  iconUrl: cafeI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const restaurant = new L.Icon({
  iconUrl: foodI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const lighthouse = new L.Icon({
  iconUrl: lighthouseI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const picnicArea = new L.Icon({
  iconUrl: picnicI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const pub = new L.Icon({
  iconUrl: pubI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const warning = new L.Icon({
  iconUrl: warningI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const taxi = new L.Icon({
  iconUrl: taxiI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const rider = new L.Icon({
  iconUrl: riderI,
  iconSize: new L.Point(25, 30),
  className: null,
});

export const hiker = new L.Icon({
  iconUrl: hikerI,
  iconSize: new L.Point(25, 30),
  className: null,
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
