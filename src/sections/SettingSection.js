import React from 'react';
import DataSelector from '../components/DataSelector';
import DateFilter from '../components/DateFilter';
import UrlSelector from '../components/UrlSelector';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ChartSettings from '../components/ChartSettings';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SettingSection = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        width: '50%',
        padding: '10px',
        border: '1px solid #c4c4c4',
        overflow: 'scroll'
      }}>
      <Accordion>
        <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
          <Typography className={classes.heading}>Data Source</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UrlSelector />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary aria-controls='panel4a-content' id='panel3a-header'>
          <Typography className={classes.heading}>Chart Settings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChartSettings />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary aria-controls='panel2a-content' id='panel3a-header'>
          <Typography className={classes.heading}>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DateFilter />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary aria-controls='panel3a-content' id='panel3a-header'>
          <Typography className={classes.heading}>
            Aggregation Settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataSelector />
        </AccordionDetails>
      </Accordion>

    </div>
  );
};

export default SettingSection;
