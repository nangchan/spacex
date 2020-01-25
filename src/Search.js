import React from 'react';

import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import createDecorator from 'final-form-focus';

//import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const focusOnError = createDecorator()

/**
 * Search form rendered on side drawer used to lookup customers
 */
const Search = ({query, setQuery}) => {

  return (
    <Form
      decorators={[focusOnError]}
      onSubmit={(values, form)=>setQuery(values)} // no-op
      render={({ handleSubmit, form, submitting, pristine, dirtyFields, dirtySinceLastSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <ListItem button type="submit" component="button" selected={true} >
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Search"/>
          </ListItem>
          <Paper style={{ padding: 16 }} elevation={/* disable shadows */0}>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="mission_name"
                  component={TextField}
                  variant="outlined"
                  type="search"
                  label="Mission Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="rocket_name"
                  component={TextField}
                  variant="outlined"
                  type="search"
                  label="Rocket Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="launch_year"
                  component={TextField}
                  variant="outlined"
                  type="search"
                  label="Launch Year"
                />
              </Grid>
              <Grid item style={{ }}>
                <Button
                  type="button"
                  variant="contained"
                  onClick={form.reset}
                  disabled={submitting}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                </Grid>
            </Grid>
          </Paper>
        </form>
      )}
    />
  );
};

export default Search;