async function getDetails(name) {
  const queryData = {
      "query": name,
      "timezone": "US/Eastern"
  };
  const API_KEY = 'ce553babdd090ec13bb61b73a2fe4805'; // Your API key
  const API_ID = '5797c6ed'; // Your API ID
  const API_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-app-id': API_ID,
              'x-app-key': API_KEY
          },
          body: JSON.stringify(queryData)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      
      return data;
  } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
  }
}

module.exports = getDetails;
