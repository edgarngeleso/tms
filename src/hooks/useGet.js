import React, {useEffect, useState} from 'react';

const useGet = ({url, options = {method: 'GET'}, dependecies = []}) => {
  const [data, setData] = useState({
    error: false,
    message: '',
    loading: false,
    results: [],
  });

  const fetchData = async aurl => {
    if (aurl) {
      url = aurl;
    }

    setData({
      error: false,
      message: '',
      loading: true,
      results: [],
    });

    fetch(url, options)
      .then(req => req.json())
      .then(response => {
        if(response.status && response.status=="FAILED"){
          setData({
            error: true,
            message: response.error,
            loading: false,
            results: [],
          });
        }else{
          setData({
            error: response.error,
            message: response.message,
            loading: false,
            results: response.data??[],
          });
        }
        
      })
      .catch(error => {
        setData({
          error: true,
          message: 'An error occurred.',
          loading: false,
          results: [],
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, dependecies);

  return {
    error: data.error,
    message: data.message,
    loading: data.loading,
    results: data.results,
    fetchData,
  };
};

export default useGet;
