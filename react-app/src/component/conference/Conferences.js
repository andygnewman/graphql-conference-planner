import React  from 'react';
import './Conferences.css';
import ConferenceOverview from './ConferenceOverview';

import gql from 'graphql-tag';
import {waitForGraphql} from '../../apollo'; import {divideInRows} from '../../utils/index';

const Conferences = ({data: {
  conferences
}}) => {
    return (
      <div className="container section">

        <div className="columns section">
          <div className="column is-8">
            <div className="title">Conferences</div>
          </div>
        </div>

          {
            divideInRows(conferences, conference =>
              <div className="column is-4" key={conference.id}>
                <ConferenceOverview conference={conference}/>
              </div>
            )
          }
      </div>
    );
};

Conferences.defaultProps = {
  data: {
    conferences: []
  }
};

// TODO write a query to get all conferences
const query = gql`
    query Lol {
      conferences: allConferences {
        id
        startDate
        name
        logo
        _attendeesMeta {
          count
        }
        city
        country
      }
    }`;


const config = {
  options : {
    fetchPolicy: 'cache-and-network'
  }
};

// TODO Use the HoC waitForGraphql to enhance your component with the query
const ConferencesData = waitForGraphql(query, config)(Conferences);

export default ConferencesData;
