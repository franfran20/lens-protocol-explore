import React from "react";
import styles from "../styles/components/RecommendedProfile.module.css";

export const RecommendedProfile = ({
  id,
  bio,
  handle,
  name,
  picture,
  stats,
}) => {
  return (
    <a href={`/profiles/${id}`} className={styles.recommendedContainer}>
      <div className={styles.profileImage}>
        {picture ? (
          <img src={picture.original.url} />
        ) : (
          <img src="/empty-profile.png" />
        )}
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.profileDetails}>
          <p>
            <span>ID</span>: {id}{" "}
          </p>
          <p>
            <span>Name</span>: {name}
          </p>
          <p>
            <span>Handle</span>: {handle}
          </p>
        </div>
        {bio ? <p>Bio: {bio}</p> : ""}

        <div className={styles.profileStats}>
          <p>Followers: {stats.totalFollowers}</p>
          <p>Following: {stats.totalFollowing}</p>
        </div>
      </div>
    </a>
  );
};

//image
//handle
//bio
