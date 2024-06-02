import axios from "axios";

export const ShowCartItems = async () => {
  try {
    const response = await axios.get("https://localhost:7184/api/diamonds/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
