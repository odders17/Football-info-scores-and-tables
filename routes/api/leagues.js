const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const leagues = {
  LaLiga: 2014,
  PremierLeague: 2021,
  Bundesliga: 2002,
  'Serie A': 2019,
  'Ligue 1': 2015
};

/*
url - API url
options - 
{
  method: 'GET' or 'POST' etc...
  headers: {'X-Auth-Token':'...'}
}
*/
const fetchFromApi = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

// @route     Get api/leagues
// @desc      Get all leagues
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const result = {};
    for (league in leagues) {
      //get league from api

      const url = `https://api.football-data.org/v2/competitions/${leagues[league]}/standings`;
      const options = {
        method: 'GET',
        headers: { 'X-Auth-Token': process.env.API_TOKEN }
      };

      const leagueData = await fetchFromApi(url, options);

      if (leagueData.message) throw new Error(leagueData.message);
      result[leagues] = leagueData.standings
        .find(standing => standing.type === 'TOTAL')
        .table.map(standing => {
          return {
            position: standing.position,
            id: standing.team.id,
            name: standing.team.name,
            img: standing.team.crestUrl,
            playedGames: standing.playedGames,
            won: standing.won,
            draw: standing.draw,
            lost: standing.lost,
            points: standing.points,
            goalsFor: standing.goalsFor,
            goalsAgainst: standing.goalsAgainst,
            goalDifference: standing.goalDifference
          };
        });
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: ' + err.message);
  }
});

module.exports = router;