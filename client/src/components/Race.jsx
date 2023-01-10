import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Race = () => {
  const [challenge, setChallenge] = useState('');
  const [language, setLanguage] = useState('');
  const [solution, setSolution] = useState('');

  const getRandomChallenge = () => {
    axios.get('/play')
      .then(res => {
        console.log('success retrieving challenge', res.data);
        setChallenge(res.data[0].challenge);
        setLanguage(res.data[0].language);
        setSolution(res.data[0].solution);
      })
      .catch(err => {
        console.log('error retrieving challege', err);
      });
  };

  useEffect(() => {
    getRandomChallenge();
  }, []);

  return (
    <div>
      {challenge !== undefined ? <div>{`${challenge}`}</div> : null}
      {language !== undefined ? <div>{`${language}`}</div> : null}
      {solution !== undefined ? <div>{`${solution}`}</div> : null}
    </div>
  );
};

export default Race;