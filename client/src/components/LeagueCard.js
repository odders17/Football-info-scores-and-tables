import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  card: {
    margin: '1%',
    flex: '0 25%'
  },
  cardMedium: {
    margin: '1% 5%',
    flex: '0 35%'
  },
  cardMobile: {
    margin: '2% 20%',
    flex: '0 80%'
  },
  media: {
    height: 350
  },
  mediaMedium: {
    height: 300
  },
  mediaMobile: {
    height: 250
  }
});

export default function LeagueCard(props) {
  const classes = useStyles();

  const mobileMedia = useMediaQuery('(max-width:600px)');

  const mediumMedia = useMediaQuery('(max-width:1000px)');

  const getClassNameCard = () => {
    if (mobileMedia) return classes.cardMobile;
    if (mediumMedia) return classes.cardMedium;
    return classes.card;
  };
  const getClassNameMedia = () => {
    if (mobileMedia) return classes.mediaMobile;
    if (mediumMedia) return classes.mediaMedium;
    return classes.media;
  };

  return (
    <Card className={getClassNameCard()} onClick={() => props.onClick()}>
      <CardActionArea onClick={() => props.onClick()}>
        <CardMedia
          className={getClassNameMedia()}
          image={props.leagueImg}
          title={props.leagueName}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {props.leagueName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => props.onClick()} size='small' color='secondary'>
          See Standings
        </Button>
      </CardActions>
    </Card>
  );
}