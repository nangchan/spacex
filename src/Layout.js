import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Search from './Search';
import SpaceXgraphQL from './SpaceXgraphQL';

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Layout() {
  const classes = useStyles();

  const [query, setQuery] = React.useState({
    mission_name: '',
    rocket_name: '',
    launch_year: '',
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            SpaceX Launches
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Search query={query} setQuery={setQuery} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SpaceXgraphQL searchMissionName={query.mission_name||''} searchRocketName={query.rocket_name||''} searchLaunchYear={query.launch_year||''} />
      </main>
    </div>
  );
}