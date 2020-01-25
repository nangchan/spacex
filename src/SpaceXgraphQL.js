import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import MediaCard from './MediaCard';

/**
 * Component responsible for querying SpaceX GraphQL API and constructing Material-UI MediaCards
 * 
 * @param {function} setQueryLoading [required] - Reach Hook setState used to pass loading state to parent
 * @param {number} searchLimit [required] - Limit of return set
 * @param {string} searchMissionName [optional] - Name of mission to search
 * @param {string} searchRocketName [optional] - Name of rocket to search
 * @param {string} searchLaunchYear [optional] - Launch Year to search
 * 
 * @returns {object} JSX list of MediaCards
 */
const SpaceXgraphQL = (props) => {
  // default undefined props to empty string for GraphQL to work
  const {setQueryLoading, searchLimit, searchMissionName='', searchRocketName='', searchLaunchYear=''} = props;

  return (
  <Query query={gql`
    query SearchLaunchesPast {
      launchesPast(limit: ${searchLimit}, find: {mission_name: "${searchMissionName}", rocket_name: "${searchRocketName}", launch_year: "${searchLaunchYear}"}) {
        id
        mission_name
        links {
          flickr_images
          video_link
        }
        rocket {
          rocket_name
        }
        ships {
          image
        }
        launch_date_local
        launch_year
        details
      }
    }`
  }>
    {({ loading, error, data }) => {
      // notify parent of state
      setQueryLoading(loading);

      if (loading) return <p style={{padding: 10}}></p>;
      if (error) return <p style={{padding: 10}}>Error :(</p>;

      const lists = data.launchesPast.map(launch => (
        <div style={{margin:10}} key={launch.id}>
          <MediaCard
            missionName={launch.mission_name}
            flickrImage={launch.links.flickr_images[0]}
            videoLink={launch.links.video_link}
            rocketName={launch.rocket.rocket_name}
            shipImage={launch.ships[0] ? launch.ships[0].image : null}
            launchDateLocal={launch.launch_date_local}
            details={launch.details} />
        </div>
      ));

      return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 355px)'}}>
          {lists}
        </div>
      );
    }}
  </Query>
  );
};

export default SpaceXgraphQL;