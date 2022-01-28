import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
          <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>
            Source of data: UNESCO Institute for Statistics (Data as of September 2021)</Typography>
            <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>Aggregation method: Weighted average</Typography>
            <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}> Data collection method: statistical surveys regularly conducted at national level covering R&D performing entities in the private and public sectors </Typography>
            <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>Available Data:</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}