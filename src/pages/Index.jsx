import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { convertDate } from "../utils/convertDate";

// constants
import { LAUNCHES_ROCKET } from "../constants/variables";

// queries
import { useLaunches } from "../services/query/launches";
import Header from "../components/Header";

import {
  MdOutlineKeyboardArrowRight,
  MdClose,
  MdOutlineInbox,
  MdRefresh,
} from "react-icons/md";
import PuffLoader from "react-spinners/PuffLoader";

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
              <h3 className="font-bold text-xl text-xl whitespace-nowrap">
                Rocket List
              </h3>
              <div className="w-full flex justify-end items-center">
                <button onClick={() => refetch()}>
                  <MdRefresh
                    size={24}
                    className={`inline-block text-gray-400 mr-4 cursor-pointer ${
                      loading && "animate-spin"
                    }`}
                  />
                </button>
                <input
                  type="text"
                  placeholder="Search rocket name .."
                  className="w-1/2 md:w-1/4 focus:border-green-400 focus:outline-green-500"
                  onChange={(e) => searchRocket(e)}
                />
              </div>
            </div>

            {!loading && !!data?.launches?.length ? (
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
            ) : null}
            {loading && (
              <p className="flex justify-center items-center p-4 text-gray-500">
                <PuffLoader color="rgb(22 163 74)" />
                <span className="ml-4 text-gray-500">Loading ...</span>
              </p>
            )}

            {!data?.launches?.length && !loading ? (
              <p className="text-center p-4 text-gray-500">Rocket not found!</p>
            ) : null}
          </section>

          <div className="md:mt-20">
            {!!Object.keys(detail).length && (
              <div className="border rounded-md">
                <div className="mb-2 bg-gray-200 p-3 text-gray-600 flex justify-between items-center">
                  <h4 className="font-bold text-md flex items-center">
                    <MdOutlineInbox className="inline-block mr-1" size={20} />
                    Detail Launch
                  </h4>
                  <span onClick={() => setDetail({})}>
                    <MdClose size={24} className="cursor-pointer" />
                  </span>
                </div>
                <div className="p-4">
                  <table className="table-detail">
                    <tbody>
                      <tr>
                        <td>Rocket</td>
                        <td className="text-green-600 font-semibold">
                          <Link
                            to={`/rocket/${detail?.rocket?.rocket?.id}`}
                            className="flex items-center"
                          >
                            : {detail?.rocket?.rocket_name}
                            <MdOutlineKeyboardArrowRight
                              className="inline-block"
                              size={24}
                            />
                          </Link>
                        </td>
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
