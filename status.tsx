import { Meteor } from "meteor/meteor";
import { DDP } from "meteor/ddp";
import React, { useState, useEffect, useRef } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { SecondsCountdown } from "./countdown";

export type ConnectionStatusProps = {
  className?: string;
  style?: React.CSSProperties & {
    wrapper?: React.CSSProperties;
    statusContainer?: React.CSSProperties;
    retryContainer?: React.CSSProperties;
    connectBtn?: React.CSSProperties;
  };
  words?: {
    retryIn?: string;
    connectNow?: string;
    second?: string;
    seconds?: string;
  } & { [key in DDP.Status]?: string };
};

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  className,
  style,
  words,
}) => {
  const [hidden, setHidden] = useState(true);
  const [disconnectedOnce, setDisconnectedOnce] = useState(false);

  const ddpStatus = useTracker<DDP.DDPStatus | undefined>(() => {
    if (Meteor.isClient) {
      const connectionStatus = Meteor.status();
      return connectionStatus;
    }
  }, []);

  const { connected, status, retryTime } = ddpStatus || {};

  useEffect(() => {
    if (retryTime !== undefined) {
      setDisconnectedOnce(true);
    }
  }, [retryTime]);

  const hiddenRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!hidden && connected) {
      // hide the status in few seconds
      hiddenRef.current = setTimeout(() => {
        setHidden(true);
      }, 1000);
    }
    return () => {
      if (hiddenRef.current) {
        clearTimeout(hiddenRef.current);
      }
    };
  }, [hidden, connected]);

  useEffect(() => {
    if (!connected) {
      setHidden(false);
    }
  }, [connected]);

  useEffect(() => {
    console.log("window.location.href", window.location.href);
    // try to reconnect when the url changes
    if (!connected && status === "waiting") {
      Meteor.reconnect();
    }
  }, [window.location.href]);

  const connectNow = () => {
    Meteor.reconnect();
  };

  const renderRetryIn = () => {
    if (status !== "waiting") {
      return null;
    }
    let retryIn = 0;
    if (retryTime) {
      retryIn = Math.floor(Math.abs(retryTime - new Date().getTime()) / 1000);
    }

    return (
      <span className='retry-in' style={theStyle?.retryContainer}>
        {words?.retryIn || "retry in"}{" "}
        <SecondsCountdown
          seconds={retryIn}
          secondText={words?.second}
          secondsText={words?.seconds}
        />
        .
        <button
          className='connect-now'
          onClick={() => connectNow()}
          style={theStyle?.connectBtn}
        >
          {words?.connectNow || "Connect now"}
        </button>
      </span>
    );
  };

  // hide status on connected for the first time
  if (connected && disconnectedOnce === false) {
    return null;
  }

  if (hidden) {
    return null;
  }

  if (Meteor.isServer) {
    return null;
  }

  // console.log('connection status', connected, disconnectedOnce, status);

  const theStyle = { ...defaultStyle, ...style };

  return (
    <div className={`connection-status ${className}`} style={theStyle?.wrapper}>
      <span className={`status ${status}`} style={theStyle?.statusContainer}>
        {status && words?.[status] ? words[status] : status}
        {status === "waiting" ? ", " : ""}
      </span>{" "}
      {renderRetryIn()}
    </div>
  );
};

const defaultStyle: ConnectionStatusProps["style"] = {
  wrapper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    background: "#000000bf",
    zIndex: 9999,
    padding: "2px 5px",
    color: "#e0e0e0",
    borderRadius: "0 5px 0 0",
  },
  statusContainer: {},
  retryContainer: {},
  connectBtn: {
    marginLeft: 5,
    textTransform: "none",
    border: "1px solid #e0e0e0",
    borderRadius: 5,
  },
};

export default ConnectionStatus;
