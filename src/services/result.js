const checkResults = async (guids) => {
  const response = await fetch(
    `https://hewa-service.herokuapp.com/api/v1/result/${guids.join(';')}`
  );
  if (response.ok) {
    const entries = response.json();
    return entries;
  }

  throw new Error(response.status);
};

module.exports = {
  checkResults,
};
