import React, { useEffect, useState } from "react";
import Tweet from "./Components/Tweet";
import "./styles.css";
import { fetchTweets } from "./Utils/fetch";
import { cloneDeep } from "lodash";
import { TWEETS_AMOUNT } from "./constants";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [lastTweetId, setLastTweetId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

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
      }
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFetching) {
        setIsFetching(true);
        updateTweets();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isFetching]);

  return (
    <div className="App">
      {tweets.map((tweet, i) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
