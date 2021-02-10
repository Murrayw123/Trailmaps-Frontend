export interface Marker {
  id: number,
  marker_type: string
  marker_lat: number
  marker_lng: number
  marker_info: Array<{title: string, value: string}>
  marker_title: string
  marker_blurb: string
  default_image: string
}
