import i18n from "i18next";

const api_results = [
  {
    address_components: [
      {
        long_name: "5a",
        short_name: "5a",
        types: ["street_number"],
      },
      {
        long_name: "127. Sokak",
        short_name: "127. Sk.",
        types: ["route"],
      },
      {
        long_name: "Şehitler",
        short_name: "Şehitler",
        types: ["administrative_area_level_4", "political"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
      {
        long_name: "45300",
        short_name: "45300",
        types: ["postal_code"],
      },
    ],
    formatted_address: "Şehitler, 127. Sk. 5a, 45300 Salihli/Manisa, Türkiye",
    geometry: {
      location: {
        lat: 38.4807995,
        lng: 28.1239524,
      },
      location_type: "ROOFTOP",
      viewport: {
        northeast: {
          lat: 38.4821484802915,
          lng: 28.1253013802915,
        },
        southwest: {
          lat: 38.4794505197085,
          lng: 28.1226034197085,
        },
      },
    },
    place_id: "ChIJX04rAHBauBQRY5LEnIk9hFc",
    plus_code: {
      compound_code: "F4JF+8H Salihli/Manisa, Türkiye",
      global_code: "8GCCF4JF+8H",
    },
    types: ["street_address"],
  },
  {
    address_components: [
      {
        long_name: "5",
        short_name: "5",
        types: ["street_number"],
      },
      {
        long_name: "127. Sokak",
        short_name: "127. Sk.",
        types: ["route"],
      },
      {
        long_name: "Şehitler",
        short_name: "Şehitler",
        types: ["administrative_area_level_4", "political"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
      {
        long_name: "45300",
        short_name: "45300",
        types: ["postal_code"],
      },
    ],
    formatted_address: "Şehitler, 127. Sk. No:5, 45300 Salihli/Manisa, Türkiye",
    geometry: {
      location: {
        lat: 38.4808809,
        lng: 28.1240024,
      },
      location_type: "RANGE_INTERPOLATED",
      viewport: {
        northeast: {
          lat: 38.4822298802915,
          lng: 28.1253513802915,
        },
        southwest: {
          lat: 38.4795319197085,
          lng: 28.1226534197085,
        },
      },
    },
    place_id:
      "EjbFnmVoaXRsZXIsIDEyNy4gU2suIE5vOjUsIDQ1MzAwIFNhbGlobGkvTWFuaXNhLCBUdXJrZXkiGhIYChQKEgkJlnwAcFq4FBEfp666JGMpVhAF",
    types: ["street_address"],
  },
  {
    address_components: [
      {
        long_name: "17",
        short_name: "17",
        types: ["street_number"],
      },
      {
        long_name: "127. Sokak",
        short_name: "127. Sk.",
        types: ["route"],
      },
      {
        long_name: "Şehitler",
        short_name: "Şehitler",
        types: ["administrative_area_level_4", "political"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
      {
        long_name: "45300",
        short_name: "45300",
        types: ["postal_code"],
      },
    ],
    formatted_address:
      "Şehitler, 127. Sk. No:17, 45300 Salihli/Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 38.4809559,
          lng: 28.124297,
        },
        southwest: {
          lat: 38.48077,
          lng: 28.1238032,
        },
      },
      location: {
        lat: 38.480863,
        lng: 28.1240501,
      },
      location_type: "GEOMETRIC_CENTER",
      viewport: {
        northeast: {
          lat: 38.4822119302915,
          lng: 28.1253990802915,
        },
        southwest: {
          lat: 38.47951396970851,
          lng: 28.1227011197085,
        },
      },
    },
    place_id: "ChIJCZZ8AHBauBQRHqeuuiRjKVY",
    types: ["route"],
  },
  {
    address_components: [
      {
        long_name: "F4JF+9H",
        short_name: "F4JF+9H",
        types: ["plus_code"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
    ],
    formatted_address: "F4JF+9H Salihli/Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 38.481,
          lng: 28.124,
        },
        southwest: {
          lat: 38.480875,
          lng: 28.123875,
        },
      },
      location: {
        lat: 38.480938,
        lng: 28.1239603,
      },
      location_type: "GEOMETRIC_CENTER",
      viewport: {
        northeast: {
          lat: 38.4822864802915,
          lng: 28.1252864802915,
        },
        southwest: {
          lat: 38.47958851970851,
          lng: 28.12258851970849,
        },
      },
    },
    place_id: "GhIJq7NaYI89Q0ARmoC63LsfPEA",
    plus_code: {
      compound_code: "F4JF+9H Salihli/Manisa, Türkiye",
      global_code: "8GCCF4JF+9H",
    },
    types: ["plus_code"],
  },
  {
    address_components: [
      {
        long_name: "Şehitler",
        short_name: "Şehitler",
        types: ["administrative_area_level_4", "political"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
      {
        long_name: "45300",
        short_name: "45300",
        types: ["postal_code"],
      },
    ],
    formatted_address: "Şehitler, 45300 Salihli/Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 38.4840609,
          lng: 28.1322299,
        },
        southwest: {
          lat: 38.4762739,
          lng: 28.120301,
        },
      },
      location: {
        lat: 38.4810142,
        lng: 28.1283605,
      },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: {
          lat: 38.4840609,
          lng: 28.1322299,
        },
        southwest: {
          lat: 38.4762739,
          lng: 28.120301,
        },
      },
    },
    place_id: "ChIJt05mgGVauBQRFPZz5k6DDEU",
    types: ["administrative_area_level_4", "political"],
  },
  {
    address_components: [
      {
        long_name: "45300",
        short_name: "45300",
        types: ["postal_code"],
      },
      {
        long_name: "Şehitler",
        short_name: "Şehitler",
        types: ["administrative_area_level_4", "political"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
    ],
    formatted_address: "Şehitler, 45300 Salihli/Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 38.4840609,
          lng: 28.1322299,
        },
        southwest: {
          lat: 38.4762739,
          lng: 28.120301,
        },
      },
      location: {
        lat: 38.4810142,
        lng: 28.1283605,
      },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: {
          lat: 38.4840609,
          lng: 28.1322299,
        },
        southwest: {
          lat: 38.4762739,
          lng: 28.120301,
        },
      },
    },
    place_id: "ChIJ07JJhm9auBQRXs21Hy1Iy6Q",
    types: ["postal_code"],
  },
  {
    address_components: [
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["locality", "political"],
      },
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
    ],
    formatted_address: "Salihli, Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 38.505678,
          lng: 28.1840739,
        },
        southwest: {
          lat: 38.46751,
          lng: 28.094649,
        },
      },
      location: {
        lat: 38.487074,
        lng: 28.138052,
      },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: {
          lat: 38.505678,
          lng: 28.1840739,
        },
        southwest: {
          lat: 38.46751,
          lng: 28.094649,
        },
      },
    },
    place_id: "ChIJGXFQLFhauBQRCwZUp76HPuM",
    types: ["locality", "political"],
  },
  {
    address_components: [
      {
        long_name: "Salihli",
        short_name: "Salihli",
        types: ["administrative_area_level_2", "political"],
      },
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
    ],
    formatted_address: "Salihli/Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 38.766777,
          lng: 28.4697379,
        },
        southwest: {
          lat: 38.325182,
          lng: 27.926625,
        },
      },
      location: {
        lat: 38.5855422,
        lng: 28.2058768,
      },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: {
          lat: 38.766777,
          lng: 28.4697379,
        },
        southwest: {
          lat: 38.325182,
          lng: 27.926625,
        },
      },
    },
    place_id: "ChIJxcAo5IZEuBQRkh9ufiantLA",
    types: ["administrative_area_level_2", "political"],
  },
  {
    address_components: [
      {
        long_name: "Manisa",
        short_name: "Manisa",
        types: ["administrative_area_level_1", "political"],
      },
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
    ],
    formatted_address: "Manisa, Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 39.423783,
          lng: 29.1186169,
        },
        southwest: {
          lat: 38.083416,
          lng: 27.122022,
        },
      },
      location: {
        lat: 38.8419373,
        lng: 28.1122679,
      },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: {
          lat: 39.423783,
          lng: 29.1186169,
        },
        southwest: {
          lat: 38.083416,
          lng: 27.122022,
        },
      },
    },
    place_id: "ChIJ6eR21vE5uBQRd0B5rS2pwNc",
    types: ["administrative_area_level_1", "political"],
  },
  {
    address_components: [
      {
        long_name: "Türkiye",
        short_name: "TR",
        types: ["country", "political"],
      },
    ],
    formatted_address: "Türkiye",
    geometry: {
      bounds: {
        northeast: {
          lat: 42.3666999,
          lng: 44.8178449,
        },
        southwest: {
          lat: 35.8085919,
          lng: 25.5377,
        },
      },
      location: {
        lat: 38.963745,
        lng: 35.243322,
      },
      location_type: "APPROXIMATE",
      viewport: {
        northeast: {
          lat: 42.3666999,
          lng: 44.8178449,
        },
        southwest: {
          lat: 35.8085919,
          lng: 25.5377,
        },
      },
    },
    place_id: "ChIJcSZPllwVsBQRKl9iKtTb2UA",
    types: ["country", "political"],
  },
];

export const getDetailedLocationObject = (results = api_results) => {
  let city = "";
  let country = "";
  let formatted_address = "";
  let place_id = "";
  let coordinates = {};
  try {
    // Getting address components
    for (var i = 0; i < results[0].address_components.length; i++) {
      for (var b = 0; b < results[0].address_components[i].types.length; b++) {
        // Getting city / state
        if (
          [
            "administrative_area_level_1",
            "administrative_area_level_2",
          ].includes(results[0].address_components[i].types[b])
        ) {
          city = results[0].address_components[i].long_name;
          break;
        }
        // Getting country
        if (["country"].includes(results[0].address_components[i].types[b])) {
          country = results[0].address_components[i].long_name;
          break;
        }
      }
    }
    // Getting formatted address
    formatted_address = results[0].formatted_address;

    // Getting place_id for future works
    place_id = results[0].place_id;

    // Getting geometry properties (lng, lat...)
    coordinates = results[0].geometry.location;

    return {
      city,
      country,
      formatted_address,
      place_id,
      coordinates,
    };
  } catch (error) {
    throw Error(i18n.t("Location Error"));
  }
};
