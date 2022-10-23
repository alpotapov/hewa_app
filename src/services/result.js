const checkResults = async (guids) => {
  const response = await fetch(
    `https://hewa-service.herokuapp.com/api/v1/result/${guids.join(';')}`
  );
  if (response.ok) {
    const publishedResults = await response.json();
    return publishedResults;
  }

  throw new Error(response.status);
};

module.exports = {
  checkResults,
};
