export const fetchTwitterData = async () => {
  const response = await fetch("https:localhost:5000/api/twitter_query");
  if (response.status >= 400) {
    throw new Error("Error fetching twitter data");
  } else {
    return await response.json();
  }
};
