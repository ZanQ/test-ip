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
const ipurl = "http://localhost:3000/api/hello";
//const ipurl = "https://test-ip.vercel.app/api/hello";

const URL_BASE = 'http://dev.zanq.co/';
//const URL_BASE ='http://localhost/ZanQ/';
const ANON_POST_DETAILS = URL_BASE + 'index.php/Api/Post/PostDetailWithIP';

export default function Post({ postData }) {

    var imageArray = [];

    /*
    if ((postData.images) && (postData.images.length > 0)) {

        for (var i = 0; i < postData.images.length; i++) {
                        
            //Add to Array to send to Image Carousel
            var imageObj = new Object();
            imageObj.src = URL_BASE + postData.images[i];
            imageObj.altText = "Image " + (i + 1);
            imageArray.push(imageObj);
        }
    }
    else {

        var imageObj1 = new Object();
        imageObj1.src = "/images/noimage.jpeg";
        imageObj1.altText = "Image 1";
        imageArray.push(imageObj1);

    }
    */
    return (
        
      <Layout>
        <React.Fragment>    
            { postData }
        </React.Fragment>
      </Layout>
    )
}

//Changes the middle widget based on Navigations clicked
function buttonClicked(event, value) {

    //Split to figure out if user Clicked on Zan, Comment or Share
    var res = value;

     Swal.fire({
        icon: 'error',
        title: 'Registration Required',
        text: res + ' are only available to registered users',
        footer: '<a href="http://dev.zanq.co/Zan/">Register here</a>'
      })
}

export async function getServerSideProps({ params }) {
    
    /*
    let postData = await sendID(params.id)
        .then((data) => {

            //Success
            if (data['code'] === 1) {

                return (
                        data['data']
                )
            }  
            else {
                var error2 = new Error(data['message']);
                throw error2;
            }  
        })
    .catch(error => console.log(error))

    return {
      props: {
        postData
      }
    }*/

    let postData = await sendID(params.id);
    return {
        props: {
          postData
        }
    }
}

async function sendID (id) {

    let ipresponse = await axios.get(ipurl)
              .catch(errors => console.log(errors));
    let ip = await ipresponse.data;
  
    //console.log("ID - : " + id);
    console.log("IP - : " + ip);
  
    return ip;

    //Data Object to Pass Through
    /*const DetailRequest = {
          postId: id,
          ip: await ip,
    }
  
    let response = await fetch(ANON_POST_DETAILS, { 
      method: 'POST',
      headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "params=" + JSON.stringify(DetailRequest) + "&developer=1",
      credentials: 'same-origin'
      })
      .then(response => {
              if (response.ok) {
                      return response;
              }
              else {
                      var error = new Error('Error ' + response.status + ': ' + response.statusText);
                      error.response = response;
                      throw error;
              }
      },
      error => {
              var errorMessage = new Error(error.errorMessage);
              throw errorMessage;
      }) 
  
    let data = await response.json();
    
    return (
        data
    )*/
}


