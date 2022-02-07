import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import ListItemIcon from '@mui/material/ListItemIcon';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Impressum() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 1 }}>
        About
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              About
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ width: '100%' }}>
          <ListItem>
            <ListItemText
              primary="General Info"
              secondary="This page is brought to you by the LMU Munich project course Information Visualization by Prof. Dr. Andreas Butz and Team Toppo, consisting of  Mirjam Feigl, Hendrik Geiger, Lennart Grigoleit, Anna Hartmeyer, Manuel Riegel."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Project Description"
              secondary="The aim of the project is to visualize research & development expenditures in dependency with patent registrations in Europe. The Web Application will display this dependency per country and it's development over time by visualizing
a cholopleth map of Europe, a Bubble Chart and interactive features."
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Data Resources" secondary="The data was sourced from:" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CircleIcon sx={{ fontSize: 5, color: 'white', ml: 3 }} />
            </ListItemIcon>
            <Link href="https://www.worldwide-patents.com/the-dataset">
              Patent Data (worldwide-patents.com)
            </Link>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CircleIcon sx={{ fontSize: 5, color: 'white', ml: 3 }} />
            </ListItemIcon>
            <Link href="https://data.worldbank.org/indicator/SP.POP.TOTL">
              Population Data (Worldbank)
            </Link>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <CircleIcon sx={{ fontSize: 5, color: 'white', ml: 3 }} />
            </ListItemIcon>
            <Link href="https://data.worldbank.org/indicator/GB.XPD.RSDV.GD.ZS">
              R&D Expenditure Data (Worldbank)
            </Link>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
