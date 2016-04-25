/**
 * Created by Danpan on 26.03.16.
 */

export default AddressFullSchema = new SimpleSchema({
  // country: 'Россия',
  country: {
    type: String,
    optional: false
  },
  // city_district: 'Кузьминки р-н',
  city_district_id: {
    type: String,
    optional: true
  },
  // city_district: 'Кузьминки р-н',
  city_district: {
    type: String,
    optional: true
  },
  // fias_id: 'aaf636a4-80b3-4955-a3d7-633d40330bc3',
  fias_id: {
    type: String,
    optional: false
  },
  // fias_level: '8',
  fias_level: {
    type: String,
    optional: false
  },
  // // geo_lat: '55.7031782',
  // TODO geo
  // // geo_lon: '37.7689784',
  // TODO geo
  // house: '86',
  house: {
    type: String,
    optional: true
  },
  // kladr_id: '7700000000000130661',
  kladr_id: {
    type: String,
    optional: false
  },
  // postal_code: '109443',
  postal_code: {
    type: String,
    optional: false
  },
  // region: 'Москва',
  region: {
    type: String,
    optional: false
  },
  // full_address: 'Россия, г Москва, пр-кт Волгоградский, д 86 к 2',
  full_address: {
    type: String,
    optional: false
  },
  // street: 'Волгоградский
  street: {
    type: String,
    optional: true
  },
  loc: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

/*
 {
 city_district: 'Кузьминки р-н',
 country: 'Россия',
 fias_id: 'aaf636a4-80b3-4955-a3d7-633d40330bc3',
 fias_level: '8',
 geo_lat: '55.7031782',
 geo_lon: '37.7689784',
 house: '86',
 kladr_id: '7700000000000130661',
 postal_code: '109443',
 region: 'Москва',
 full_address: 'Россия, г Москва, пр-кт Волгоградский, д 86 к 2',
 street: 'Волгоградский'
 },*/
