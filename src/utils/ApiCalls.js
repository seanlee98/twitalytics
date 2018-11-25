export const fetchTwitterData = async query => {
  const response = await fetch(
    `http://localhost:5000/api/twitter_query?query=${query}`
  );
  if (response.status >= 400) {
    throw new Error("Error fetching twitter data");
  } else {
    return await response.json();
  }
};
