import axios from "axios";

export const fetchImages = async (query, page) => {
  const accessKey = "yid1n_SwL59l61bNr7MZb1uUXnMfj72A4_uJUFsl-lQ";
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: accessKey,
      query: query,
      page,
      per_page: 20,
    },
  });
  return response.data;
};
