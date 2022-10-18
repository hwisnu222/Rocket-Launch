import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useQuery } from "@apollo/client";
import { useLaunches } from "../services/query/launches";
import { DETAIL_ROCKET } from "../constants/variables";

export default function DetailRocket() {
  const { idRocket } = useParams();
  const rocketDetail = useLaunches(DETAIL_ROCKET);
  const variables = {
    variables: {
      rocketId: idRocket,
    },
  };
  const {
    data: { rocket },
  } = useQuery(rocketDetail, variables);
  return (
    <>
      <Header />
      <div className="container">
        <h3 className="text-xl font-semibold">Rocket Detail</h3>
        <div className="mt-6">
          <table>
            <tbody>
              <tr>
                <td>Company</td>
                <td>{rocket.company}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{rocket?.name}</td>
              </tr>
              <tr>
                <td>Country</td>
                <td>{rocket?.country}</td>
              </tr>
              <tr>
                <td>first_flight</td>
                <td>rocket?.first_flight</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{rocket?.height?.meters} Meters</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{rocket?.type}</td>
              </tr>
              <tr>
                <td>Mass</td>
                <td>{rocket?.mass?.kg}</td>
              </tr>
              <tr>
                <td>Diameter</td>
                <td>{rocket?.diameter?.meters} Meters</td>
              </tr>
            </tbody>
          </table>

          <h4 className="text-xl font-semibold mb-4 mt-6">Description</h4>
          <p className="text-gray-700">{rocket?.description}</p>
        </div>
      </div>
    </>
  );
}
