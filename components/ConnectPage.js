import React from "react";
import { useMoralis } from "react-moralis";

export const ConnectPage = () => {
  const { enableWeb3 } = useMoralis();
  return (
    <div className="connectPage">
      <div className="bigScreen">
        <h1>
          View all the recommended profiles on Lens and follow any of your
          choice
        </h1>
        <button onClick={() => enableWeb3()}>Connect</button>
      </div>

      <div className="smallScreen">
        <h1>
          Switch to a bigger device with a wider screen e.g desktop or laptop
        </h1>
      </div>
    </div>
  );
};
