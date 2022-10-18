import { LAUNCHES_ROCKET, DETAIL_ROCKET } from "../../constants/variables";
import { gql } from "@apollo/client";

const queries = {
  [LAUNCHES_ROCKET]: gql`
    query ($limit: Int, $find: LaunchFind) {
      launches(limit: $limit, find: $find) {
        rocket {
          rocket_name
          rocket {
            id
          }
        }
        launch_date_utc
        launch_site {
          site_name_long
          site_name
        }
        mission_name
        details
        launch_date_local
        launch_success
        upcoming
      }
    }
  `,
  [DETAIL_ROCKET]: gql`
    query Rocket($rocketId: ID!) {
      rocket(id: $rocketId) {
        description
        country
        cost_per_launch
        company
        first_flight
        height {
          meters
        }
        stages
        type
        mass {
          kg
        }
        diameter {
          meters
        }
        name
      }
    }
  `,
};

export const useLaunches = (type) => {
  return queries[type];
};
