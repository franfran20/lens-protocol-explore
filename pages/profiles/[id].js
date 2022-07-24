import {
  DOES_FOLLOW,
  GET_PROFILE_BY_ID,
  GET_PUBLICATIONS,
} from "../../utils/api";
import { useQuery } from "@apollo/client/react";
import React from "react";
import { Publication } from "../../components/Publication";
import { useRouter } from "next/router";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { lensHubAbi } from "../../utils/abi";
import { ConnectPage } from "../../components/ConnectPage";

export default function Handle() {
  const router = useRouter();
  const { id } = router.query;
  const { enableWeb3, isWeb3Enabled, account } = useMoralis();

  const {
    loading,
    error,
    data: clickedProfile,
  } = useQuery(GET_PROFILE_BY_ID, {
    variables: { request: { profileId: id } },
  });

  const { loading: publicationsLoading, data: publications } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: {
        request: {
          profileId: id,
          publicationTypes: ["POST", "COMMENT", "MIRROR"],
          limit: 14,
        },
      },
    }
  );

  const { loading: doesFollowLoading, data: doesFollowData } = useQuery(
    DOES_FOLLOW,
    {
      variables: {
        request: {
          followInfos: [
            {
              followerAddress: account,
              profileId: id,
            },
          ],
        },
      },
    }
  );

  const { runContractFunction: follow, error: followError } = useWeb3Contract({
    contractAddress: "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82",
    abi: lensHubAbi,
    functionName: "follow",
    params: {
      profileIds: [parseInt(id)],
      datas: [0x0],
    },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  if (!isWeb3Enabled) {
    return <ConnectPage />;
  }

  console.log(clickedProfile.profile);

  return (
    <div className="individualProfileContainer">
      <div className="bannerAndPfp">
        <img
          src={
            clickedProfile.profile.coverPicture == null
              ? "/default-b.png"
              : clickedProfile.profile.coverPicture.original.url
          }
          className="banner"
        />
        <img
          src={
            clickedProfile.profile.picture == null
              ? "/empty-profile.png"
              : clickedProfile.profile.picture.original.url
          }
          className="pfp"
        />

        <div className="details">
          <div className="profileInformation">
            <p>
              <span>Handle:</span> {clickedProfile.profile.handle}
            </p>
            <p>
              <span>Name:</span> {clickedProfile.profile.name}
            </p>
            <p>
              <span>ID:</span> {clickedProfile.profile.id}
            </p>
            <p>
              <span>Bio: </span>
              {clickedProfile.profile.bio == null
                ? "No Bio"
                : clickedProfile.profile.bio}
            </p>
          </div>

          <div className="followInformation">
            <p>
              <span>Followers</span>:{" "}
              {clickedProfile.profile.stats.totalFollowers}
            </p>
            <p>
              <span>Following</span>:{" "}
              {clickedProfile.profile.stats.totalFollowing}
            </p>
            {doesFollowLoading ? (
              ""
            ) : doesFollowData.doesFollow[0].follows ? (
              <p className="following">Following</p>
            ) : (
              <div>
                <button onClick={() => follow()} className="follow">
                  Follow
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="publicationsID">
        <h3>Publications</h3>
        <div>
          {publicationsLoading
            ? "Loading..."
            : publications.publications.items.map(
                ({ createdAt, metadata, profile, stats, id }) => {
                  return (
                    <Publication
                      key={id}
                      createdAt={createdAt}
                      metadata={metadata}
                      profile={profile}
                      stats={stats}
                    />
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
}
