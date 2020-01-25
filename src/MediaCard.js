import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import missingImage from './missing.jpg';
import { CardActions } from '@material-ui/core';

//<img src={logo} className="App-logo" alt="logo" />

const useStyles = makeStyles({
  card: {
    width: 345,
    height: 545,
  },
  media: {
    height: 280,
  },
});

export default function MediaCard({mission_name, flickr_image, video_link, rocket_name, launch_date_local, details}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader style={{height:'6em'}}
        title={mission_name}
        subheader={rocket_name}
      />
      <Link href={video_link} target='_blank' style={{textDecoration: 'none'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={flickr_image || missingImage}
          title={rocket_name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" style={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical'
          }}>
            {details}
          </Typography>
        </CardContent>
        <CardActions>
          <Button>{launch_date_local}</Button>
        </CardActions>
      </CardActionArea>
      </Link>
    </Card>
  );
}