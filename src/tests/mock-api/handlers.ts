import { rest } from "msw";

const map = rest.get("/api/maps/mundabiddi", (req, res, ctx) => {
  return res(
    ctx.json(
      {
        id: 1,
        map_name: "Munda Biddi",
        alias: "mundabiddi",
        type: "cycling",
        default_filters: [{"type": "town"}],
        track: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [116.16541, -31.90418, 302.929],
                  [116.16597, -31.90439, 304.38],
                  [116.16632, -31.90457, 309.836],
                  [116.16684, -31.90479, 308.844],
                  [116.16725, -31.90493, 306.495],
                ],
              },
            },
          ],
        },
      },
    )
  );
});

const markers = rest.get("/api/markers/",  (req, res, ctx) => {
  return res(
    ctx.json([
      {
        id: 139,
        marker_type: "campsite",
        marker_lat: -32.399614,
        marker_lng: 116.290517,
        map: 1,
        marker_info: [
          {
            title: "Water",
            value: "Untreated tank water",
          },
        ],
        marker_title: "Mt Cooke Group Campsite",
        marker_blurb:
          "The purpose-built Bibbulmun campsites/huts contain a sleeping shelter, several tent sites, a composting toilet (bring your toilet paper!), two rainwater tanks and picnic tables.",
        default_image: "",
        is_approved: true,
      },
      {
        id: 8,
        marker_type: "town",
        marker_lat: -33.358257,
        marker_lng: 116.157565,
        map: 1,
        marker_info: [
          {
            title: "Food",
            value: "Coles Woolworths",
          },
          {
            title: "Public Transport",
            value: "TransWA Coach",
          },
          {
            title: "Bike Shops",
            value: "Crank'n Cycles",
          },
        ],
        marker_title: "Collie",
        marker_blurb:
          "Collie, located in dense jarrah forest near the junction of the Collie and Harris Rivers, is home to around 9,500 residents. It is large enough to offer the services expected of a regional centre but small enough to retain its country charm. The town offers a range of shopping facilities (Coles, Woolworths, Target) as well as medical resources (including doctors, dentists and chiropractors) and, importantly a great bike shop, Crank'n Cycles!",
        default_image: "",
        is_approved: true,
      },
      {
        id: 9,
        marker_type: "town",
        marker_lat: -33.482877,
        marker_lng: 115.72775,
        map: 1,
        marker_info: [
          {
            title: "Food",
            value: "General Store",
          },
          {
            title: "Bike Shops",
            value: "None",
          },
          {
            title: "Public Transport",
            value: "TransWA Coach",
          },
        ],
        marker_title: "Boyanup",
        marker_blurb:
          "Boyanup is only a couple kilometres from the Trail. It is a small picturesque town of around 600 residents. If you’re in need of a good pub meal it’s worth the detour. There are also a few small stores where you can top up on snacks.",
        default_image: "",
        is_approved: true,
      },
      {
        id: 13,
        marker_type: "town",
        marker_lat: -34.102243,
        marker_lng: 115.977267,
        map: 1,
        marker_info: [
          {
            title: "Food",
            value: "General Store",
          },
          {
            title: "Accomodation",
            value: "School bunkhouse",
          },
          {
            title: "Public Transport ",
            value: "None",
          },
        ],
        marker_title: "Donnelly Village",
        marker_blurb:
          "This historic mill town marks the halfway point of the Munda Biddi Trail. The mill itself, which closed in 1978, is dilapidated yet the Donnelly Mill worker's cottages became a holiday destination. Enjoy a coffee on the verandah of the General Store and get to know the locals – a large number of very tame kangaroos and emus. In late spring this area comes alive with colour and cyclists will be amazed at the variety of flowering plants. Photo: Elite Air Imagery ",
        default_image:
          "https://res.cloudinary.com/dqlvslhyi/image/upload/v1546345352/o7czeqozo9ptktzenqtt.jpg",
        is_approved: true,
      },
    ])
  );
});

const mapPreview = rest.get("api/map_preview", async (req, res, ctx) => {
  return res(
    ctx.json([
      {
        id: 1,
        map_name: "Munda Biddi",
        alias: "mundabiddi",
        type: "cycling",
        allowed_transport: ["cycling"]
      },
      {
        id: 2,
        map_name: "Cape to Cape",
        alias: "capetocape",
        type: "bushwalking",
        allowed_transport: ["walking"]
      },
    ])
  );
});

const spotUsers = rest.get("/api/spotusers/", async (req, res, ctx) => {
  return res(ctx.json([]));
});

const spotLocations = rest.get("/spotlocations", async (req, res, ctx) => {
  return res(ctx.json([]));
});

const spotUsersWithLocation = rest.get(
  "/spotuserswithlocation",
  async (req, res, ctx) => {
    return res(ctx.json([]));
  }
);

const handlers = [
  map,
  markers,
  mapPreview,
  spotUsers,
  spotLocations,
  spotUsersWithLocation,
];

export { handlers };
