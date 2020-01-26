import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Search from './Search';
import SpaceXgraphQL from './SpaceXgraphQL';
import CustomizedSnackbars from './Notification';

import { DEFAULT_SEARCH_LIMIT } from './settings';

const drawerWidth = 340;

/**
 * Boiler code from Material-UI used to style permanent Drawer
 */
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

/**
 * Layout built from Material-UI permanent Drawer component.
 * This will host the Search form used to specify queries and
 * the results render with Material-UI Card utilizing the
 * Material-UI snackbar notification system.
 */
export default function Layout() {
  const classes = useStyles();

  // feedback from SpaceXgraphQL component
  // NOTE: cannot use object since this will cause an infinite loop 
  //       due to objects being different with each update from callback
  const [queryLoading, setQueryLoading] = useState(false);
  const [queryResultSize, setQueryResultSize] = useState(0);

  // query sent to SpaceXgraphQL
  const [query, setQuery] = useState({
    mission_name: '',
    rocket_name: '',
    launch_year: '',
    limit: DEFAULT_SEARCH_LIMIT,
  });

  return (
    <div className={classes.root}>
      <CustomizedSnackbars open={queryLoading} />
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
        <Search query={query} setQuery={setQuery} queryResultSize={queryResultSize} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SpaceXgraphQL
          setQueryLoading={setQueryLoading}
          setQueryResultSize={setQueryResultSize}
          searchMissionName={query.mission_name}
          searchRocketName={query.rocket_name}
          searchLaunchYear={query.launch_year}
          searchLimit={query.limit} />
      </main>
    </div>
  );
}