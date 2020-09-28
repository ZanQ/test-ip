import React from 'react';
import fetch from 'isomorphic-unfetch';
// ZEIT has created a data-fetching library called SWR (client side).
import useSWR from 'swr';

const API_URL = 'https://extreme-ip-lookup.com/json/';
//const API_URL = "https://test-ip.vercel.app/api/hello";


async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

function Index() {

  const { data, error } = useSWR(API_URL, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { query } = data;

  /*return (
    <div>
      <p>IP: {query}</p>
    </div>
  );*/
  return query;
  
}

export default Index;