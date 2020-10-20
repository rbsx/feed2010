import React, { useEffect, useState, useLayoutEffect } from "react";
import Tweet from "./Components/Tweet";
import "./styles.css";
import { fetchTweets } from "./Utils/fetch";
import { cloneDeep } from "lodash";
import { TWEETS_AMOUNT } from "./constants";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [position, setPosition] = useState(0);
  const [bottom, setBottom] = useState(false);
  const [lastTweetId, setLastTweetId] = useState(null);
  const [firstTweetId, setFirstTweetId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);

      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        setBottom(true);
      } else {
        setBottom(false);
      }
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const handleOlderTweets = () => {
    fetchTweets(TWEETS_AMOUNT, null, firstTweetId).then((newTweets) => {
      if (newTweets.length === 0) {
        console.log("Refetch after error");
        handleOlderTweets();
      } else {
        let oldTweets = cloneDeep(tweets);
        if (newTweets.length > 0) {
          setFirstTweetId(newTweets[newTweets.length - 1].id);
        }
        setTweets(oldTweets.concat(newTweets));
        setIsFetching(false);
      }
    });
  };

  useEffect(() => {
    if (bottom && position > 0) {
      setIsFetching(true);
      handleOlderTweets();
    }
  }, [bottom]);

  const updateTweets = () => {
    fetchTweets(TWEETS_AMOUNT, lastTweetId).then((newTweets) => {
      let oldTweets = cloneDeep(tweets);
      if (newTweets.length > 0) {
        setLastTweetId(newTweets[0].id);
      }
      setTweets(newTweets.concat(oldTweets));
      setIsFetching(false);
    });
  };

  useEffect(() => {
    setIsFetching(true);
    fetchTweets(TWEETS_AMOUNT).then((tweets) => {
      setTweets(tweets);
      if (tweets.length > 0) {
        setLastTweetId(tweets[0].id);

        if (!firstTweetId) {
          setFirstTweetId(tweets[tweets.length - 1].id);
        }
      }
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFetching && position === 0) {
        setIsFetching(true);
        updateTweets();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isFetching, position]);

  return (
    <div className="App">
      {tweets.map((tweet, i) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
