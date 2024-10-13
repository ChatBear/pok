import React, {useEffect, useState} from 'react';
import {getTournament} from '../../services/tournament_service';
import {Tournament} from '../../model/tournament';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL as string;

export const useGetTournament = async (actualBatch: number): Tournament[] => {
  const [error, setError] = useState<Error | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  // try {
  //   setLoading(true);
  //   addTournamentService(tournament)
  //     .then((response: number) => {
  //       setLoading(false);
  //       setSucess(true);
  //     })
  //     .catch((errorRequest: Error) => {
  //       setError(errorRequest);
  //     });
  // } catch {
  //   console.error('Error when adding a tournament:', error);
  // }
  useEffect(() => {
    try {
      getTournament(actualBatch).then(data => setTournaments(data));
    } catch (err) {
      setError(error);
      console.log(error);
      throw error;
    }
  }, [actualBatch]);
  console.log('Dans le hook');
  console.log(tournaments);
  return tournaments;
};
