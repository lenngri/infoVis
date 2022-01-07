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
      Research and experimental development (R&D) comprise work undertaken on a systematic basis in order to increase the stock of knowledge, including knowledge of man, culture and society, and the use of this stock of knowledge to devise new applications. R&D expenditures include all expenditures for R&D performed within the business enterprise sector (BERD) on the national territory during a given period, regardless of the source of funds. R&D expenditure in BERD are shown as a percentage of GDP (R&D intensity).
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
