import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// used for displaying launches without images
import missingImage from './images/missing.jpg';

/**
 * CSS styles used to render card so each card is uniformily sized
 */
const useStyles = makeStyles({
  // used to specify card size
  card: {
    width: 345,
    height: 525,
  },
  // used to style header
  header: {
    height:'6em',
  },
  media: {
    height: 280,
  },
  link: {
    textDecoration: 'none'
  },
  // used to style local launch date
  date: {
    marginTop:10,
    textAlign:'right',
    fontWeight:'bold'
  },
  // used to style details section with trimming using ellipsis
  details: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical'
  }
});

/**
 * Individual Materil-UI card used to display information regarding the launch
 * 
 * @param {string} missionName [optional] - Name of mission
 * @param {string} flickrImage [optional] - Url to launch image
 * @param {string} videoLink [optional] - Url to video link
 * @param {string} rocketName [optional] - Name of rocket
 * @param {string} shipImage [optional] - Url of ship image (used if launch image is unavailable)
 * @param {string} launchDateLocal [optional] - Date of launch in local time
 * @param {string} details [optional] - Text specifying launch details
 * 
 * @returns JSX Material-UI Card populated info specified by the above parameters
 */
export default function MediaCard({missionName, flickrImage, videoLink, rocketName, shipImage, launchDateLocal, details}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header}
        title={missionName}
        subheader={rocketName}
      />
      <Link href={videoLink}
        className={classes.link}
        target='_blank' // open in new tab
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={flickrImage || shipImage || missingImage} // use rocket image or ship image or default missing image
            title={rocketName}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.details}>
              {details}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.date}>
              {launchDateLocal}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}