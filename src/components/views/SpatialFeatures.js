import { useEffect } from 'react';
import spatialFeaturesSource from 'data/sources/spatialFeaturesSource';
import { SPATIAL_FEATURES_LAYER_ID } from 'components/layers/SpatialFeaturesLayer';
import { useDispatch } from 'react-redux';
import { addLayer, removeLayer, addSource, removeSource } from '@carto/react-redux';
import { FormulaWidget } from '@carto/react-widgets';
import { AggregationTypes } from '@carto/react-core';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  spatialFeatures: {},
}));

export default function SpatialFeatures() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(spatialFeaturesSource));

    dispatch(
      addLayer({
        id: SPATIAL_FEATURES_LAYER_ID,
        source: spatialFeaturesSource.id,
      })
    );

    return () => {
      dispatch(removeLayer(SPATIAL_FEATURES_LAYER_ID));
      dispatch(removeSource(spatialFeaturesSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.spatialFeatures}>
      <Grid item>
        <FormulaWidget
          id='totalPopulation'
          title='Total Population'
          dataSource={spatialFeaturesSource.id}
          column='population'
          operation={AggregationTypes.SUM}
        />
        <FormulaWidget
          id='averageElevation'
          title='Average Elevation'
          dataSource={spatialFeaturesSource.id}
          column='elevation'
          operation={AggregationTypes.AVG}
        />
      </Grid>
    </Grid>
  );
}
