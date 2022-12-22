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

const subscribeToResult = async (guid, pushToken) => {
  const response = await fetch(`https://hewa-service.herokuapp.com/api/v1/result/subscribe`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ guid, pushToken })
  });
  if (response.ok) {
    return;
  }

  throw new Error(response.status);
}

module.exports = {
  checkResults,
  subscribeToResult,
};
