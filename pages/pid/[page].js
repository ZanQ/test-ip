import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
//import myIP   from '../components/getIP'
import Index from '../components/getIP';

const ipurl = "https://test-ip.vercel.app/api/hello";

function Page({ postDetails }) {

  /*const [postIP, setData] = useState(<div/>);

  useEffect(() => setData(myIP()), []);

  return <div>Next stars: { myIP() } </div> */


  return <Index />;
}

export default Page

/*
class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch(ipurl)
    const json = await res.json()
    return { stars: json.clientIP }
  }

  render() {
    return <div>Next stars: {this.props.stars}</div>
  }
}

export default Page*/