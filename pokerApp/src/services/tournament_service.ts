import axios from 'axios';
import {Tournament} from '../model/tournament';

// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL as string;
// const REACT_APP_BACKEND_URL = 'http://10.0.2.2:8000';
const REACT_APP_BACKEND_URL = 'http://0.0.0.0:8000';

export const addTournamentService = async (
  tournament: Tournament,
): Promise<any> => {
  try {
    const response = await axios.post(
      `${REACT_APP_BACKEND_URL}/tournament/`,
      {
        name: tournament.name,
        date: tournament.date,
        buy_in: tournament.buyIn,
      },
      {
        headers: {
          'Content-Type': 'application/json', // Ensure the correct content type
        },
      },
    );
    return response;
  } catch (error) {
    console.error('Error when adding a tournament:', error);
    throw error;
  }
};

export const getTournament = async (actual_batch: number): Promise<any> => {
  try {
    const response = await axios.get(`${REACT_APP_BACKEND_URL}/tournament/`, {
      params: {
        start_batch: actual_batch,
        end_batch: actual_batch + 20,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
