import axios from 'axios';
const NASA_URL= 'https://api.nasa.gov/planetary/apod';



export async function PicOfTheDay() {
  try {
    const response = await axios.get(
      `${NASA_URL}?api_key=${import.meta.env.VITE_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}