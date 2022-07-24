import React from "react";
import styles from "../styles/components/Publication.module.css";
import Link from "next/link";

export const Publication = ({ createdAt, id, metadata, profile, stats }) => {
  return (
    <div className={styles.publicationContainer}>
      <div className={styles.profileDetails}>
        {profile.picture ? (
          <img src={profile.picture.original.url} />
        ) : (
          <img src="/empty-profile.png" />
        )}
        <h3>{profile.handle}</h3>
      </div>

      <div className={styles.postDetails}>
        <p>
          <span>Created At</span>:{" "}
          {createdAt.slice(0, 10) + " " + createdAt.slice(11, 15)}
        </p>
        <p>{metadata.content ? metadata.content : ""}</p>
        <div>
          {metadata.media.mime == 0
            ? ""
            : metadata.media.map(({ original }) => {
                if (original.mimeType == "video/mp4") {
                  return (
                    <a href={original.url}>
                      <video width="320" height="240" controls>
                        <source src={original.url} type="video/mp4" />
                      </video>
                    </a>
                  );
                }

                if (
                  original.mimeType == "image/png" ||
                  original.mimeType == "image/jpg" ||
                  original.mimeType == "image/gif"
                ) {
                  return (
                    <a href={original.url}>
                      <img src={original.url} />
                    </a>
                  );
                }
              })}
        </div>
      </div>

      <div className={styles.postStats}>
        <p className={styles.para}>
          <span>Mirrors</span>: {stats.totalAmountOfMirrors}
        </p>
        <p className={styles.para}>
          <span>Collects</span>: {stats.totalAmountOfCollects}
        </p>
        <p className={styles.para}>
          <span>Comments</span>: {stats.totalAmountOfComments}
        </p>
      </div>
    </div>
  );
};
