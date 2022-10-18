import { LAUNCHES_ROCKET } from "../../constants/variables";
import { gql } from "@apollo/client";

export const useLaunches = (type, data) => {
  const LAUNCHES_ROCKET_LIST = gql`
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
  `;
  switch (type) {
    case LAUNCHES_ROCKET:
      return LAUNCHES_ROCKET_LIST;
    default:
      break;
  }
};
