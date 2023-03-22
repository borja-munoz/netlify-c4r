import { MAP_TYPES } from '@deck.gl/carto';

const SPATIAL_FEATURES_SOURCE_ID = 'spatialFeaturesSource';

const source = {
  id: SPATIAL_FEATURES_SOURCE_ID,
  type: MAP_TYPES.QUERY,
  connection: 'carto_dw',
  data: `SELECT geoid as h3, population, elevation, urbanity FROM carto-data.ac_iqucqlom.sub_carto_derived_spatialfeatures_usa_h3res8_v1_yearly_v2`,
};

export default source;
