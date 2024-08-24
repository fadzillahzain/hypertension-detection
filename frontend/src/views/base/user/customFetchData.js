import { useEffect, useState} from 'react';
import axios from 'axios';
import { makeRequest } from '../../../axios';

const useFetchData = (url) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await makeRequest.get(url,{headers :{Authorization: `Bearer ${currentUser.token}`}});
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetchData;