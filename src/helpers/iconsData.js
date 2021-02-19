import townI from "./icons/town.svg";
import finishI from "./icons/finish.svg";
import businessI from "./icons/business.svg";
import bicycleI from "./icons/bicycle.svg";
import hikingI from "./icons/hiking.svg";
import tentI from "./icons/tent.svg";
import hutI from "./icons/hut.svg";
import waterI from "./icons/water.svg";
import attractionI from "./icons/attraction.svg";
import vehicleI from "./icons/vehicle.svg";
import selectedI from "./icons/selected.svg";
import cafeI from "./icons/cafe.svg";
import foodI from "./icons/food.svg";
import lighthouseI from "./icons/lighthouse.svg";
import picnicI from "./icons/picnic.svg";
import pubI from "./icons/pub.svg";
import warningI from "./icons/warning.svg";
import taxiI from "./icons/taxi.svg";
import riderI from "./icons/rider.svg";
import hikerI from "./icons/hiker.svg";
import startI from "./icons/start.svg";

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

export function findIcon(type) {
  switch (type) {
    case "start":
      return startI;
    case "finish":
      return finish;
    case "business":
      return businessI;
    case "bicycle":
      return bicycleI;
    case "campsite":
      return tentI;
    case "hut":
      return hutI;
    case "town":
      return townI;
    case "water":
      return waterI;
    case "attraction":
      return attractionI;
    case "vehicle":
      return vehicleI;
    case "cafe":
      return cafeI;
    case "restaurant":
      return restaurantI;
    case "lighthouse":
      return lighthouseI;
    case "picnic_area":
      return picnicI;
    case "pub":
      return pubI;
    case "warning":
      return warning;
    case "problem":
      return warning;
    case "taxi":
      return taxiI;
    case "cyclist":
      return riderI;
    case "hiker":
      return hikerI;
    default:
      return attractionI;
  }
}

export const food_groupings = ["restaurant", "pub", "cafe"];
export const business_groupings = ["taxi"];
