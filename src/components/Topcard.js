import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ListItemIcon from '@mui/material/ListItemIcon'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircleIcon from '@mui/icons-material/Circle';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minWidth: 345}}>

      <CardContent>
        <Typography variant="h4" gutterBottom sx={{fontWeight: 'bold'}}>About this page</Typography>
        <Typography variant="body1">This page shows the development of patent registrations and research and development (R&D)
          expenditures of European countries over time. Whereas the Choropleth serves for an overview
          of patent registrations and R&D investments, the Bubble Chart allows for comparison of
          countries of special interest and recognition of patterns in the data (e.g., investigating
          correlations between the number of patent registrations and investment in R&D activities).
          If desired, in-depth information can be retrieved to get deeper insights into the data of
          individual countries.</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{textAlign:'left', fontWeight:'bold', ml: 2}}>Patent Data</Typography>
          <Typography sx={{mb:2, textAlign:'left', ml: 2}}>The dataset provides geographic coordinates for inventor and applicant locations found in 18.8 million patent documents that were filed in years 1980 through 2014. It combines information from nine national, regional and international patent databases and covers 81 percent of all first filings applied for across the globe over the considered time period.</Typography>

<Table sx={{ minWidth: 650 }} aria-label="Patent Data">
        <TableHead>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight: 'bold'}} style={{ verticalAlign: 'top'}} width='30%'>Source of data:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">Patenting activity is often measured at a single patent office such as the European Patent Office (EPO) or the United States Patent and Trademark Office (USPTO). But these offices only attract a selected set of patented inventions. For example, we estimate that less than 40 percent of all priority filings by Swiss inventors in 2010 were filed at the EPO.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight: 'bold'}} style={{ verticalAlign: 'top'}}>Data collection method:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">7 million inventor and applicant addresses from 46 countries were collected, geocoded and  allocated to the corresponding countries, regions and cities. When the address information was missing in the original document (priority filing), it was imputed using information from subsequent filings in the patent family.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top'}}>Available Data:</TableCell>
            <TableCell sx={{ border:0,typography: 'body1' }}align="left">
               <List>
                <ListItem >
                  <ListItemIcon>
                     <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                 </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> 46 countries </ListItemText>
                </ListItem>

               <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2 }}> Availability Range: Year [1980 - 2014]</ListItemText>
                </ListItem>

               <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 5, color:"black",mt:-2}}/>
                </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5,mt:-2}}> Filtered by year [1996 - 2014] and European countries</ListItemText>
               </ListItem>
              </List>
            </TableCell>
          </TableRow>

        </TableHead>
    </Table>

          <Typography variant="h5" gutterBottom sx={{textAlign:'left', fontWeight:'bold', mt: 10, ml: 2}}>R&D Investment Data</Typography>
          <Typography sx={{mb:2, ml: 2, textAlign:'left'}}>Research and development expenditures comprise the gross domestic expenditures on research and development, expressed as percent of GDP. This includes current and capital expenditures on research and development activities of all resident companies, research institutes, universities and government laboratories. R&D expenditures financed by domestic firms but performed abroad are not considered in the data set.</Typography>

          
      <Table sx={{ minWidth: 650 }} aria-label="Table R&D Investment Data">
        <TableHead>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top' }} width='30%'>Source of data:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">UNESCO Institute for Statistics (Data as of September 2021)</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top' }}>Aggregation method:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">Weighted average</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top' }}>Data collection method:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">Statistical surveys regularly conducted at national level covering R&D performing entities in the private and public sectors</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top' }}>Available Data:</TableCell>
            <TableCell sx={{ border:0,typography: 'body1' }}align="left">
               <List>
                <ListItem >
                  <ListItemIcon>
                     <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                 </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> 266 countries </ListItemText>
                </ListItem>

               <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> Availability Range: Year [1960 - 2020]</ListItemText>
                </ListItem>

               <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> Filtered by year [1996 - 2014] and European countries</ListItemText>
               </ListItem>
              </List>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top'}}>Definition Research & Development:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">Creative work undertaken on a systematic basis in order to increase the stock of knowledge including knowledge of man, culture and society, and the use of this stock of knowledge to devise new applications.</TableCell>
          </TableRow>

        </TableHead>
    </Table>

          <Typography variant="h5" gutterBottom sx={{textAlign:'left', fontWeight:'bold', mt: 10, ml: 2}}>Population Data</Typography>
          <Typography sx={{mb:2, ml: 2, textAlign:'left'}}>Total population is based on the de facto definition of population, which counts all residents regardless of legal status or citizenship. The values shown are midyear estimates.</Typography>
        
    <Table sx={{ minWidth: 650}} aria-label="Table Population data">
        <TableHead>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold' }} style={{ verticalAlign: 'top'}} width='30%'>Source of data:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">(1) United Nations Population Division. World Population Prospects: 2019 Revision. (2) Census reports and other statistical publications from national statistical offices, (3) Eurostat: Demographic Statistics, (4) United Nations Statistical Division. Population and Vital Statistics Reprot (various years), (5) U.S. Census Bureau: International Database, and (6) Secretariat of the Pacific Community: Statistics and Demography Programme.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1',fontWeight:'bold'}} style={{ verticalAlign: 'top' }}>Aggregation method:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">Sum</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top' }}>Data collection method:</TableCell>
            <TableCell sx={{ border:0, typography: 'body1' }}align="left">Population estimates are usually based on national population censuses. Estimates for the years before and after the census are interpolations or extrapolations based on demographic models.</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0, typography: 'body1', fontWeight:'bold'}} style={{ verticalAlign: 'top' }}>Available Data:</TableCell>
            <TableCell sx={{ border:0,typography: 'body1' }}align="left">
               <List>
                <ListItem >
                  <ListItemIcon>
                     <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                 </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> 266 countries </ListItemText>
                </ListItem>

               <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> Availability Range: Year [1960 - 2020]</ListItemText>
                </ListItem>

               <ListItem>
                <ListItemIcon>
                  <CircleIcon sx={{ fontSize: 5, color:"black", mt:-2}}/>
                </ListItemIcon>
                <ListItemText sx={{ typography: 'body1', ml:-5, mt:-2}}> Filtered by year [1996 - 2014] and European countries</ListItemText>
               </ListItem>
              </List>
            </TableCell>
          </TableRow>

        </TableHead>
    </Table>
        </CardContent>
      </Collapse>
    </Card>
  );
}