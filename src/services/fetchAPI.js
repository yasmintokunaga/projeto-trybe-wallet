const API = 'https://economia.awesomeapi.com.br/json/all';

export const fetchAPICurrencies = async () => {
  const data = await fetch(API);
  const result = data.json();
  return result;
};
