import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useLaunches } from "../services/query/launches";
import { DETAIL_ROCKET } from "../constants/variables";

import Header from "../components/Header";
import TitleBar from "../components/TitleBar";
import { MdHeight, MdGridView } from "react-icons/md";

export default function DetailRocket() {
  const { idRocket } = useParams();
  const rocketDetail = useLaunches(DETAIL_ROCKET);
  const variables = {
    variables: {
      rocketId: idRocket,
    },
  };
  const { data } = useQuery(rocketDetail, variables);
  return (
    <>
      <Header />
      <div className="container">
        <TitleBar url="/" title="Rocket Detail" />
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src={require("../assets/rocket.png")}
              alt="rocket"
              className="h-72 mx-auto"
            />
            <div className="border rounded-md inline-block">
              <div className="mb-2 bg-gray-200 p-3 text-gray-600">
                <h4 className="font-semibold">
                  <MdGridView className="inline-block mr-1" size={20} />
                  Overview
                </h4>
              </div>

              <div className="p-3">
                <table className="table-rocket-detail">
                  <tbody>
                    <tr>
                      <td>Company</td>
                      <td>: {data?.rocket.company}</td>
                    </tr>
                    <tr>
                      <td>Name</td>
                      <td>: {data?.rocket?.name}</td>
                    </tr>
                    <tr>
                      <td>Country</td>
                      <td>: {data?.rocket?.country}</td>
                    </tr>
                    <tr>
                      <td>First Flight</td>
                      <td>: {data?.rocket?.first_flight}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border rounded-md">
              <div className="mb-2 bg-gray-200 p-3 text-gray-600">
                <h4 className="font-semibold">
                  <MdHeight className="inline-block mr-1" size={20} />
                  Size
                </h4>
              </div>
              <div className="p-3">
                <table className="table-rocket-detail">
                  <tbody>
                    <tr>
                      <td>Height</td>
                      <td>: {data?.rocket?.height?.meters} Meters</td>
                    </tr>
                    <tr>
                      <td>Type</td>
                      <td>: {data?.rocket?.type}</td>
                    </tr>
                    <tr>
                      <td>Mass</td>
                      <td>: {data?.rocket?.mass?.kg}</td>
                    </tr>
                    <tr>
                      <td>Diameter</td>
                      <td>: {data?.rocket?.diameter?.meters} Meters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="border rounded-md mt-6 pb-6">
            <div className="mb-2 bg-gray-200 p-3 text-gray-600">
              <h4 className="font-semibold">
                <MdHeight className="inline-block mr-1" size={20} />
                Description
              </h4>
            </div>
            <div className="p-3">
              <p className="text-gray-700">{data?.rocket?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
