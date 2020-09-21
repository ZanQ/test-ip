import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import previewStyles from '../../styles/preview.module.css'
 
import React, { useState, useEffect } from 'react';

//import { getAllPostIds, getPostData, getPostDetails } from '../../lib/posts'
import Head from 'next/head'
import styles from '../../components/layout.module.css'
import axios from 'axios'
import fetch from 'node-fetch'
import { Card, CardBody, CardTitle, CardImg, Row, Col, CardText, Container, CardFooter, Navbar, NavbarBrand } from 'reactstrap';
import Slideshow from "./SlideshowSupport";
import Linkify from 'react-linkify';
import Swal from 'sweetalert2';

import Post from '../components/finaldisplayComponent';

//const ipurl = "https://api.ipify.org";
//const ipurl = "http://localhost:3000/api/hello";
const ipurl = "https://test-ip.vercel.app/api/hello";

const URL_BASE = 'https://dev.zanq.co/';
//const URL_BASE ='http://localhost/ZanQ/';
const ANON_POST_DETAILS = URL_BASE + 'index.php/Api/Post/PostDetailWithIP';

import { useRouter } from "next/router";

const myIP = () => {
    
    const router = useRouter()
    let pid;

    useEffect(() => {
         pid = router.query;
    }, [router]);
    
    const [postData, setData] = useState(<div/>);

    useEffect(() => {
                if (Object.values(pid).length > 0) {  
                    console.log("PID -- " + Object.values(pid));
                    sendID(pid)
                        .then((postData) => {
                    
                            //console.log("Test : " + postData['data'].id);
                            /*const componentIp = PostDetails(postData['data']);

                            setData(componentIp)
                            
                            return componentIp;*/
                            const componentIp = postData['data'];

                            setData(componentIp)

                            //console.log("Test2 : " + componentIp.id);
                            return componentIp;
                        })
                        .catch(error => "Error" )
                }
    }, [router])

    var imageArray = [];
    
    if (postData.images) {

        //Add to Array to send to Image Carousel
        var imageObj = new Object();
        imageObj.src = URL_BASE + postData.images[0];
        imageObj.altText = "Image 1";
        imageArray.push(imageObj);

        console.log("Image : " + imageArray[0].src);
        /*if (postData.images) {


            console.log("Images : " + postData.images);

            //var imageArr = postData.images.split(",");
            console.log("Split : " + Object.prototype.toString.call(postData.images));
            console.log("First Image : " + postData.images[0]);
            console.log("Second Image : " + postData.images[1]);

        
        }*/

        return (
            <>
            <Layout>
                <Head>
                    <link rel="icon" href="/favicon.ico" />  
                    <meta property="og:url" content="http://zanq.co" />  
                    <meta property="og:image" content={ imageArray[0].src } /> 
                </Head>
                <h3> { postData.content } </h3>
            </Layout>
            
            </>
        );
    }

    else {

        console.log("In Return, Post ID: " + pid);
        return <span>{ Post("Hello") }</span>;
    }

/*
    if ((postData.images) && (postData.images.length > 0)) {

        var temparray = [];
        temparray = postData.images.split(",");

        //Add to Array to send to Image Carousel
        var imageObj = new Object();
        imageObj.src = URL_BASE + temparray.images[0];
        imageObj.altText = "Image 1";
        imageArray.push(imageObj);
    }
    else {

        var imageObj1 = new Object();
        imageObj1.src = "/images/noimage.jpeg";
        imageObj1.altText = "Image 1";
        imageArray.push(imageObj1);
    }

    return (
        <>
        <Layout>
            <Head>
                <link rel="icon" href="/favicon.ico" />  
                <meta property="og:url" content="http://zanq.co" />  
                <meta property="og:image" content={imageArray[0].src} />   
            </Head>
            <h3>{ postData.content }</h3>
        </Layout>
           
        </>
    );
    */
    /*
    console.log("IP -- " + postData['data'].id);

    

    //return postData;
    return (
        <>
        <Layout>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                
                <meta property="og:url" content="http://zanq.co" />
                <meta property="og:description" content={postData.content.substring(0, postData.content.indexOf('.'))} />
                <meta property="og:image" content={imageArray[0].src} />
                
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={postData.nickname} />
                <meta property="twitter:description" content={postData.content.substring(0, postData.content.indexOf('.'))} />
                <meta property="twitter:image" content={imageArray[0].src} />

            </Head>  
        </Layout>
        { PostDetails(postData) }
        </>
      )*/
}

async function sendID (id) {

    id = Object.values(id)[0];

    let ipresponse = await axios.get(ipurl)
              .catch(errors => console.log(errors));
    let ip = await ipresponse.data;
  
    console.log("ID - : " + id);
    console.log("IP - : " + ip);
  
    //Data Object to Pass Through
    const DetailRequest = {
          postId: id,
          ip: await ip,
    }
  
    console.log("JSON : " + JSON.stringify(DetailRequest));

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
    )
}

function PostDetails(postData) {

    var imageArray = [];

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

    return (
        
      <Layout>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            
            <meta property="og:url" content="http://zanq.co" />
            <meta property="og:description" content={postData.content.substring(0, postData.content.indexOf('.'))} />
            <meta property="og:image" content={imageArray[0].src} />
            
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={postData.nickname} />
            <meta property="twitter:description" content={postData.content.substring(0, postData.content.indexOf('.'))} />
            <meta property="twitter:image" content={imageArray[0].src} />

        </Head>  
        <React.Fragment>
            <Row className={styles.headerTagline}>
                <Col md={3} xs={2}>
                    <img src="/images/default_logo.png" height="41" width="41" alt="ZanQ"></img>
                </Col>
                <Col md={9} xs={10}>
                    <span className="title-text">ZanQ: Anonymous Personal Stories</span>
                </Col>
            </Row>
        </React.Fragment>    
        <header className={styles.header}>
            { 
            <>
                    <img
                    src={postData.user_avatar}
                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                    alt={postData.nickname}
                    />
            
                <h4>
                    <div className={utilStyles.headingLg}>{postData.nickname}</div>
                    <br />
                    <div className={utilStyles.headingSm}>Points: {postData.user_score}</div>
                </h4>    
            </>
            }
        </header>   
        <React.Fragment>
                <Card className="renderDetails">
                        <Slideshow items={imageArray} />
                        <CardBody className={previewStyles.white_space_pre}><Linkify>{postData.content}</Linkify></CardBody>
                        <span className="borderbottom" />
                        <CardFooter>
                            <Row className="row-center">
                                <Col onClick={(e) => buttonClicked(e, "Zans")} md={5} xs={4}>
                                    <Row className="ml-2">
                                        <img src="/images/ic_zan_logo.png" className="story-footer-margin-img" alt="Zanned Icon" />
                                        <span className="story-footer-margins">{postData.praise_num}</span>
                                    </Row>
                                </Col>
                                <Col onClick={(e) => buttonClicked(e, "Comments")} md={5} xs={4}>
                                    <Row className="ml-1">
                                        <div className="fa fa-comments fa-lg story-footer-margin-img" />
                                        <span className="story-footer-margins">{postData.comment_num}</span>
                                    </Row> 
                                </Col>
                                <Col md={2} xs={4}>
                                    <Row className="ml-1">
                                        <div className="fa fa-eye fa-lg story-footer-margin-img" />
                                        <span className="story-footer-margins">{postData.number_visits}</span>
                                    </Row>
                                </Col>
                            </Row> 
                        </CardFooter>
                    </Card>
        </React.Fragment>
      </Layout>
    )
}

export default myIP;


