import React from 'react';
import DataSelector from '../components/DataSelector';
import FilterList from '../components/fitlers/FilterList';
import UrlSelector from '../components/UrlSelector';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ChartSettings from '../components/chartSettings/ChartSettings';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const DataSourceAccordion = () => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
        <Typography className={classes.heading}>Data Source</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <UrlSelector />
      </AccordionDetails>
    </Accordion>
  );
};
const ChartSettingsAccordion = () => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary aria-controls='panel4a-content' id='panel3a-header'>
        <Typography className={classes.heading}>Chart Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ChartSettings />
      </AccordionDetails>
    </Accordion>
  );
};
const FiltersAccordion = () => {
  const classes = useStyles();
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary aria-controls='panel2a-content' id='panel3a-header' >
        <Typography className={classes.heading}>Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FilterList />
      </AccordionDetails>
    </Accordion>
  );
};
const AggregationSettingsAccordion = () => {
  const classes = useStyles();
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary aria-controls='panel3a-content' id='panel3a-header'>
        <Typography className={classes.heading}>
          Aggregation Settings
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <DataSelector />
      </AccordionDetails>
    </Accordion>
  );
};

const SettingSection = () => {
  const { loading, titles } = useSelector(({ data }) => data);

  return (
    <div
      style={{
        width: '50%',
        padding: '10px',
        border: '1px solid #c4c4c4',
        overflow: 'scroll',
      }}>
      <DataSourceAccordion />
      {loading ? 'loading...' : null}
      {!loading && titles.length ? <ChartSettingsAccordion /> : null}
      {titles.length ? (
        <>
          <FiltersAccordion />
          <AggregationSettingsAccordion />
        </>
      ) : null}
    </div>
  );
};

export default SettingSection;
