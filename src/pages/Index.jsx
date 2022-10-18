import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { convertDate } from "../utils/convertDate";

// constants
import { LAUNCHES_ROCKET } from "../constants/variables";

// queries
import { useLaunches } from "../services/query/launches";
import Header from "../components/Header";

import { MdCloudDownload, MdPreview } from "react-icons/md";

export default function Index() {
  const [detail, setDetail] = useState({});
  const [search, setSearch] = useState("");

  const variables = {
    variables: {
      limit: 10,
      find: {
        rocket_name: search,
      },
    },
  };
  const launches = useLaunches(LAUNCHES_ROCKET);
  const { data, loading, refetch } = useQuery(launches, variables);

  const searchRocket = (e) => {
    setSearch(e.target.value);
    refetch();
  };

  return (
    <>
      <Header />
      <div className="container pb-6">
        <div
          className={`grid grid-cols-1 grid-rows-1 ${
            Object.keys(detail).length
              ? "md:grid-cols-[6fr_2fr]"
              : "md:grid-cols-1"
          } gap-6`}
        >
          <section>
            <div className="flex justify-between items-center mt-6 mb-4">
              <h3 className="font-bold text-lg text-xl whitespace-nowrap">
                Rocket List
              </h3>
              <input
                type="text"
                placeholder="Search rocket name .."
                className="w-1/2 md:w-1/4 focus:border-green-400 focus:outline-green-500"
                onChange={(e) => searchRocket(e)}
              />
            </div>

            {!loading && data?.launches?.length && (
              <div className="overflow-auto h-[41rem]">
                <table className="table-list rounded-md overflow-scroll">
                  <thead>
                    <tr>
                      <th className="rounded-tl-md">Rocket</th>

                      <th>Status Launch</th>
                      <th>Upcoming</th>
                      <th>Mission</th>
                      <th className="rounded-tr-md">Launch</th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {data?.launches?.map((launch, index) => (
                      <tr onClick={() => setDetail(launch)} key={index}>
                        <td>{launch?.rocket?.rocket_name}</td>

                        <td>
                          {launch?.launch_success ? (
                            <span className="py-0 px-3 bg-green-600 rounded-full text-white text-sm">
                              Success
                            </span>
                          ) : (
                            <span className="py-0 px-3 bg-red-600 rounded-full text-white text-sm">
                              Failed
                            </span>
                          )}
                        </td>
                        <td>{launch?.upcoming ? "Yes" : "No"}</td>
                        <td className="whitespace-nowrap">
                          {launch?.mission_name}
                        </td>
                        <td className="whitespace-nowrap">
                          {convertDate(launch?.launch_date_utc)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {loading && (
              <p className="text-center p-4 text-gray-500">
                <MdCloudDownload />
              </p>
            )}
          </section>

          <div className="md:mt-20">
            {!!Object.keys(detail).length && (
              <div className="border rounded-md">
                <div className="mb-2 bg-gray-200 p-3 text-gray-600 flex justify-between items-center">
                  <h4 className="font-bold text-xl">Detail Launch</h4>
                  <span onClick={() => setDetail({})}>X</span>
                </div>
                <div className="p-4">
                  <table className="table-detail">
                    <tbody>
                      <tr>
                        <td>Rocket</td>
                        <Link to={`/rocket/${detail?.rocket?.rocket?.id}`}>
                          <td className="text-green-600 font-semibold">
                            : {detail?.rocket?.rocket_name}{" "}
                            <MdPreview className="inline-block" size={24} />
                          </td>
                        </Link>
                      </tr>
                      <tr>
                        <td>Launch Date</td>
                        <td>: {convertDate(detail?.launch_date_utc)}</td>
                      </tr>
                      <tr>
                        <td>Launch Site</td>
                        <td>: {detail?.launch_site?.site_name}</td>
                      </tr>
                      <tr>
                        <td>Mission Name</td>
                        <td>: {detail?.mission_name}</td>
                      </tr>
                      <tr>
                        <td>Status Launch</td>
                        <td>
                          {detail?.launch_success ? (
                            <span className="py-0 px-3 bg-green-600 rounded-full text-white text-sm">
                              Success
                            </span>
                          ) : (
                            <span className="py-0 px-3 bg-red-600 rounded-full text-white text-sm">
                              Failed
                            </span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h4 className="mt-4 font-semibold">Details</h4>
                  <p className="text-gray-700 tracking-wide">
                    {detail?.details}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
