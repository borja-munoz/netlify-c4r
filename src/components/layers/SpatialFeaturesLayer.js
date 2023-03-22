import { useSelector } from 'react-redux';
import { CartoLayer, colorBins } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const SPATIAL_FEATURES_LAYER_ID = 'spatialFeaturesLayer';

export default function SpatialFeaturesLayer() {
  const { spatialFeaturesLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) =>
    selectSourceById(state, spatialFeaturesLayer?.source)
  );
  const cartoLayerProps = useCartoLayerProps({ source });

  if (spatialFeaturesLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SPATIAL_FEATURES_LAYER_ID,
      geoColumn: 'h3',
      aggregationExp:
        'SUM(population) as population, AVG(elevation) as elevation, ANY_VALUE(urbanity) as urbanity',
      getFillColor: colorBins({
        attr: 'elevation',
        domain: [100, 500, 1000, 2000, 3000],
        colors: 'SunsetDark',
      }),
      pointRadiusMinPixels: 2,
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}
