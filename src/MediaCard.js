import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import missingImage from './missing.jpg';

//<img src={logo} className="App-logo" alt="logo" />

const useStyles = makeStyles({
  card: {
    width: 345,
    height: 525,
  },
  media: {
    height: 280,
  },
});

export default function MediaCard({mission_name, flickr_image, video_link, rocket_name, launch_year, details}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={mission_name}
        subheader={launch_year + ': ' + rocket_name}
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
      </CardActionArea>
      </Link>
    </Card>
  );
}