import React from "react";
import styled from "styled-components";

const StyledTweetWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid grey;
  padding: 30px 0;
`;

const StyledImageWrapper = styled.div`
  flex-basis: 100px;
  max-width: 100px;
  padding-right: 2rem;

  img {
    width: 100px;
    border-radius: 50%;
  }
`;

const StyledContentWrapper = styled.div`
  text-align: left;

  h2 {
    margin-top: 0;
  }
`;

const Tweet = ({ tweet }) => {
  const date = new Date(tweet.timeStamp);
  return (
    <StyledTweetWrapper>
      <StyledImageWrapper>
        <img src={tweet.image} alt={tweet.username} />
      </StyledImageWrapper>
      <StyledContentWrapper>
        <h2>{tweet.username}</h2>
        <p>{tweet.text}</p>
        <time>{date.toUTCString()}</time>
      </StyledContentWrapper>
    </StyledTweetWrapper>
  );
};

export default Tweet;
