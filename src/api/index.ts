const BASE_URL = process.env.API_END_POINT;

export const getLanguages = async (keyword: string) => {
  const response = await fetch(`${BASE_URL}/languages?keyword=${keyword}`);
  return response.json();
};
