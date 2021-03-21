export function createMapBoxElement(icon: string): HTMLElement {
  const markerElement = document.createElement("div");
  markerElement.className = "marker";
  markerElement.style.backgroundImage = `url(${icon})`;
  markerElement.style.width = "28px";
  markerElement.style.height = "28px";
  markerElement.style.backgroundSize = "28px";
  markerElement.style.backgroundRepeat = "no-repeat";
  return markerElement;
}
