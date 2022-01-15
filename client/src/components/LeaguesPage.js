import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeagueCard from './LeagueCard';
import { Button } from '@material-ui/core';
import LeagueTable from './LeagueTable';

const styles = {
  container: {
    color: 'white',
    width: '100%',
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  logoutDiv: { margin: '1%', color: 'white', fontSize: '1.2rem' },
  footer: {
    marginTop: '5px',
    fontSize: '1rem',
    color: 'white',
    position: 'relative',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: '20px'
  }
};

export class LeaguesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeaugeTable: '',
      leagues: {},
      loadingMessage: 'Loading leagues...'
    };
  }

  getImgByLeagueName(league) {
    switch (league) {
      case 'LaLiga':
        return 'https://i.pinimg.com/originals/db/5e/ba/db5eba808c660a28857f68e8ad3bafa4.jpg';

      case 'PremierLeague':
        return 'https://resources.premierleague.com/premierleague/photo/2018/12/14/9471c442-77fd-4983-9c45-b4a2b93be44a/PL-Lion.png';

      case 'Bundesliga':
        return 'https://logosvector.net/wp-content/uploads/2013/10/bundesliga-vector-logo.png';

      case 'Serie A':
        return 'https://1.bp.blogspot.com/-FuLCBTHRU-U/XWUu9FTnDtI/AAAAAAAAg0g/4Pub1pG2tNQTZlN_wNfcDYKwi0Sevgk_QCLcBGAs/s1600/SerieA2019-20LogoOff.png';

      case 'Ligue 1':
        return 'https://yt3.ggpht.com/a/AGF-l7-JUwCFSqhG38d0r6w9qZTHaKcFSc_iI8Y5gw=s900-c-k-c0xffffffff-no-rj-mo';

      default:
        break;
    }
  }

  async componentDidMount() {
    // prevent leagues from loading again when already fetched
    if (Object.keys(this.state.leagues).length === 0) {
      const leaguesObj = await this.props.getLeagues();

      if (leaguesObj !== null) {
        this.setState({
          leagues: leaguesObj
        });
      } else {
        this.setState({
          loadingMessage: 'Problem Getting leagues'
        });
      }
    } else {
    }
  }

  hideTable = () => {
    this.setState({
      showLeaugeTable: ''
    });
  };

  render() {
    return (
      <>
        <div style={styles.logoutDiv}>
          {this.props.currentUser} <br />
          <Button
            style={{ marginTop: '10px' }}
            onClick={() => this.props.logoutUser()}
            variant='contained'
            color='secondary'
          >
            Logout
          </Button>
        </div>

        {this.state.showLeaugeTable === '' ? (
          <div style={styles.container}>
            {Object.keys(this.state.leagues).length > 0
              ? Object.keys(this.state.leagues).map((league, i) => (
                  <LeagueCard
                    key={i}
                    leagueName={league}
                    onClick={() =>
                      this.setState({
                        showLeaugeTable: league
                      })
                    }
                    leagueImg={this.getImgByLeagueName(league)}
                  />
                ))
              : this.state.loadingMessage}
          </div>
        ) : (
          <div style={styles.container}>
            <LeagueTable
              hideTable={this.hideTable}
              table={this.state.leagues[this.state.showLeaugeTable]}
            />
          </div>
        )}
        {Object.keys(this.state.leagues).length > 0 ? (
          <div style={styles.footer}>© By Liron Perel</div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default withStyles(styles)(LeaguesPage);