import Layout from '../../components/layout'
import Link from 'next/link'
import previewStyles from '../../styles/preview.module.css'
 
//import { getAllPostIds, getPostData, getPostDetails } from '../../lib/posts'
import Head from 'next/head'
import styles from '../../components/layout.module.css'
import axios from 'axios'
import fetch from 'node-fetch'
import { Card, CardBody, CardTitle, CardImg, Row, Col, CardText, Container, CardFooter, Navbar, NavbarBrand } from 'reactstrap';
import utilStyles from '../../styles/utils.module.css'
import Slideshow from "./SlideshowSupport";
import Linkify from 'react-linkify';
import Swal from 'sweetalert2';

//const ipurl = "https://api.ipify.org";
//const ipurl = "http://localhost:3000/api/hello";
const ipurl = "https://test-ip.vercel.app/api/hello";

const URL_BASE = 'http://dev.zanq.co/';
//const URL_BASE ='http://localhost/ZanQ/';
const ANON_POST_DETAILS = URL_BASE + 'index.php/Api/Post/PostDetailWithIP';

import { useRouter } from "next/router";

function myIP({ ip }) {
    const router = useRouter()
    const { id } = router.query; // Destructuring our router object

    return (
        <>
          <h2>
            {id} with IP {ip}
          </h2>
        </>
    );
  }
  
  myIP.getInitialProps = async (ctx) => {
    const ipresponse = await axios.get(ipurl)
            .catch(errors => console.log(errors));
    let ip = await ipresponse.data;

    return { ip: ip }
  }
  
export default myIP

 /* 
export default function myIP() {
    const router = useRouter()
    const { id } = router.query; // Destructuring our router object
    
    let ipresponse = axios.get(ipurl)
        .catch(errors => console.log(errors));
    let ip = ipresponse.data;

    return (
        <>
          <h2>
            {id} with IP {ip}
          </h2>
        </>
    );
};

function returnIP () {

    let ipresponse = axios.get(ipurl)
              .catch(errors => console.log(errors));
    let ip = ipresponse.data;

    console.log("IP is -- : " + ip)
    return ip;
}*/
 


