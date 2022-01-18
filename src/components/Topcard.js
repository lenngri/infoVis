import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        What is this page about?
      </Typography>
      <Typography variant="h5" component="div">
        Patent registrations and R&D investments
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        This page shows the development of patent registrations and research and development (R&D)
        expenditures of European countries over time. Whereas the Choropleth serves for an overview
        of patent registrations and R&D investments, the Bubble Chart allows for comparison of
        countries of special interest and recognition of patterns in the data (e.g., investigating
        correlations between the number of patent registrations and investment in R&D activities).
        If desired, in-depth information can be retrieved to get deeper insights into the data of
        individual countries.
      </Typography>
    </CardContent>
  </React.Fragment>
);

export default function Topcard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
