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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    <Card sx={{ minWidth: 345 }}>

      <CardContent>
        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ textAlign: 'left' }}>
          What is this page about?
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Patent registrations and R&D investments
        </Typography>
        <Typography variant="body1">
          This page shows the development of patent registrations and research and development (R&D)
          expenditures of European countries over time. Whereas the Choropleth serves for an overview
          of patent registrations and R&D investments, the Bubble Chart allows for comparison of
          countries of special interest and recognition of patterns in the data (e.g., investigating
          correlations between the number of patent registrations and investment in R&D activities).
          If desired, in-depth information can be retrieved to get deeper insights into the data of
          individual countries.

        </Typography>
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
          <Typography variant="h5" gutterBottom>
            R&D investment data
          </Typography>

          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, }} aria-label="simple table">
        <TableHead>

          <TableRow>
            <TableCell sx={{ border:0 }}>Source of data:</TableCell>
            <TableCell sx={{ border:0 }}align="left">UNESCO Institute for Statistics (Data as of September 2021)</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ border:0 }}>Aggregation method:</TableCell>
            <TableCell sx={{ border:0 }}align="left">Weighted average</TableCell>
              </TableRow>

               <TableRow>
            <TableCell sx={{ border:0 }}>Data collection method:</TableCell>
            <TableCell sx={{ border:0 }}align="left">statistical surveys regularly conducted at national level covering R&D performing entities in the private and public sectors</TableCell>
              </TableRow>

               <TableRow>
            <TableCell sx={{ border:0 }}>Available Data:</TableCell>
            <TableCell sx={{ border:0 }}align="left">
               <List>
          <ListItem >
            <ListItemIcon>
             <CircleIcon sx={{ fontSize: 5, color:"black" }}/>
            </ListItemIcon>
            <ListItemText sx={{ typography: 'body1' }}> 266 countries </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemIcon>
             <CircleIcon sx={{ fontSize: 5, color:"black" }}/>
            </ListItemIcon>
            <ListItemText sx={{ typography: 'body1' }}> Availability Range: Year [1960 - 2020]
            </ListItemText>
            </ListItem>

             <ListItem>
            <ListItemIcon>
             <CircleIcon sx={{ fontSize: 5, color:"black" }}/>
            </ListItemIcon>
            <ListItemText sx={{ typography: 'body1' }}> Filtered by year [1990 - 2020] and European countries
            </ListItemText>
          </ListItem>

            </List>
            </TableCell>
              </TableRow>

        </TableHead>
            </Table>
    </TableContainer>

        </CardContent>
      </Collapse>
    </Card>
  );
}