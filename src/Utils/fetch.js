import { API_URL } from "../constants";

export const fetchTweets = async (count, afterId) => {
  const url = new URL(`${API_URL}/api`);

  if (count) {
    url.searchParams.append("count", count);
  }

  if (afterId) {
    url.searchParams.append("afterId", afterId);
  }

  return fetch(url)
    .then((response) => response.json())
    .catch(() => []);
};
