import React from "react";
import UserStatsCard from './UserStatsCard';
const MainContent = () => {
  return (
    <div className="p-4 sm:ml-64 dark:bg-gray-800" style={{ minHeight: '100vh' }}>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
          <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8">
            <div className="flex flex-col items-center justify-center m-1 border-2 border-gray-700 border-solid p-2 dark:border-gray-200 ">
              <dt className="mb-2 text-3xl font-extrabold">73k+</dt>
              <dd className="text-gray-500 dark:text-gray-400">Tokens</dd>
            </div>
            <div className="flex flex-col items-center justify-center  m-1 border-2 border-gray-700 border-solid p-2 dark:border-gray-200 ">
              <dt className="mb-2 text-3xl font-extrabold">100k+</dt>
              <dd className="text-gray-500 dark:text-gray-400">Vote Casted</dd>
            </div>
            <div className="flex flex-col items-center justify-center  m-1 border-2 border-gray-700 border-solid p-2 dark:border-gray-200 ">
              <dt className="mb-2 text-3xl font-extrabold">1000</dt>
              <dd className="text-gray-500 dark:text-gray-400">User </dd>
            </div>
            <div className="flex flex-col items-center justify-center  m-1 border-2 border-gray-700 border-solid p-2 dark:border-gray-200 ">
              <dt className="mb-2 text-3xl font-extrabold">10</dt>
              <dd className="text-gray-500 dark:text-gray-400">Open proposal</dd>
            </div>
            <div className="flex flex-col items-center justify-center m-1 border-2 border-gray-700 border-solid p-2 dark:border-gray-200 ">
              <dt className="mb-2 text-3xl font-extrabold">500</dt>
              <dd className="text-gray-500 dark:text-gray-400">Closed</dd>
            </div>
            <div className="flex flex-col items-center justify-center  m-1 border-2 border-gray-700 border-solid p-2 dark:border-gray-200 ">
              <dt className="mb-2 text-3xl font-extrabold">5</dt>
              <dd className="text-gray-500 dark:text-gray-400">Pending Approval</dd>
            </div>
          </dl>
        </div>

        <UserStatsCard />

    </div>
    </div>
  );
};

export default MainContent