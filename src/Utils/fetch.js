import { API_URL } from "../constants";

export const fetchTweets = async (count, afterId, beforeId) => {
  const url = new URL(`${API_URL}/api`);

  if (count) {
    url.searchParams.append("count", count);
  }

  if (afterId) {
    url.searchParams.append("afterId", afterId);
  }

  if (beforeId) {
    url.searchParams.append("beforeId", beforeId);
  }

  return fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response;
      } else {
        throw Error;
      }
    })
    .then((response) => response.json())
    .catch(() => []);
};
