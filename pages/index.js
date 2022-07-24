import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import {
  GET_LOGGED_IN_PROFILE,
  GET_RECENT_PUBLICATIONS,
  GET_RECOMMENDED_PROFILES,
} from "../utils/api";
import { Publication } from "../components/Publication";
import { RecommendedProfile } from "../components/RecommendedProfile";
import { ConnectPage } from "../components/ConnectPage";

export default function Home() {
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  //get latest publications
  const {
    loading,
    error,
    data: recommendedProfiles,
  } = useQuery(GET_RECOMMENDED_PROFILES);

  console.log(recommendedProfiles);

  if (!isWeb3Enabled) {
    return <ConnectPage />;
  }

  return (
    <div className={styles.container}>
      <h1>Powered by lens.</h1>
      <h2>Recommended Profiles</h2>
      <div>
        <div>
          {loading
            ? "Loading"
            : recommendedProfiles.recommendedProfiles.map(
                ({ bio, handle, name, picture, stats, id }) => {
                  return (
                    <RecommendedProfile
                      key={id}
                      bio={bio}
                      handle={handle}
                      name={name}
                      picture={picture}
                      stats={stats}
                      id={id}
                    />
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
}
