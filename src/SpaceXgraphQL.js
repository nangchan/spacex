import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import MediaCard from './MediaCard';

//launchesPast(limit: 10, find: {mission_name: "Starlink 1", rocket_name: "Falcon 9", launch_year: "2019"}) {
const SpaceX = ({searchMissionName, searchRocketName, searchLaunchYear}) => (
  <Query query={gql`
    query SearchLaunchesPast {
      launchesPast(limit: 10, find: {mission_name: "${searchMissionName}", rocket_name: "${searchRocketName}", launch_year: "${searchLaunchYear}"}) {
        id
        mission_name
        links {
          flickr_images
          video_link
        }
        rocket {
          rocket_name
        }
        launch_year
        details
      }
    }`
  }>
    {({ loading, error, data }) => {
      if (loading) return <p style={{padding: 10}}>Loading...</p>;
      if (error) return <p style={{padding: 10}}>Error :(</p>;

      const lists = data.launchesPast.map(launch => (
        <div style={{margin:10}} key={launch.id}>
          <MediaCard
            mission_name={launch.mission_name}
            flickr_image={launch.links.flickr_images[0]}
            video_link={launch.links.video_link}
            rocket_name={launch.rocket.rocket_name}
            launch_year={launch.launch_year}
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

export default SpaceX;