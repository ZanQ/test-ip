import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import Link from 'next/link'
import previewStyles from '../../styles/preview.module.css'
 
import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import styles from '../../components/layout.module.css'
import axios from 'axios'
//import fetch from 'node-fetch'
import { Card, CardBody, CardTitle, CardImg, Row, Col, CardText, Container, CardFooter, Navbar, NavbarBrand } from 'reactstrap';
import Slideshow from "./SlideshowSupport";
import Linkify from 'react-linkify';
import Swal from 'sweetalert2';

import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';

const API_URL = 'https://extreme-ip-lookup.com/json/';


const URL_BASE = 'http://dev.zanq.co/';
//const URL_BASE ='http://localhost/ZanQ/';
const ANON_POST_DETAILS = URL_BASE + 'index.php/Api/Post/PostDetailWithIP';

const myIP = ({ post }) => {

    if (!post) return <div>failed to load</div>;

    const { data, error } = useSWR(API_URL, fetcher);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;

    const { query } = data;

    return (
        <div>
            {post.id} -- { query }
        </div> 
    );
}
/*
const myIP = ({ post }) => {
    if (id === undefined) {
      return (
        <div>
          <h1>Oops</h1>
          <p>Something has gone wrong</p>
        </div>
      );
    }

  
   const { content, slug } = post;
  
    return (
      <div>
        <h1>Post Author { content }</h1>
        <p>Post ID: {slug}</p>
      </div>
    );

}*/


myIP.getInitialProps = async ({ query }) => {
    
    const { id } = query;

    console.log("Page is : " + id);

    let post = await getPost(id);
  
    //console.log("Post ID is : " + post.id);

    return {
      post
    }
}

async function getData (ip, pid) {

    let postData = await sendID(ip, pid)
        .then((data) => {

            //Success
            if (data['code'] === 1) {

                //console.log("Code : " + data['code']);
                //console.log("Data : " + Object.values(data['data']));

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
    }
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}
  
async function getIP() {
  
    let ipData = await useSWR(API_URL, fetcher)
        .then((data) => {

            if (data) {
                console.log("Client IP : " + data.query);
                
                return (
                    data.query
                )
            }
            else {
                var error2 = new Error(data['message']);
                throw error2;
            }  
        })
        .catch(error => console.log(error))

    console.log("After call");
    
    /*if (error) {
        console.log("Error");
        return <div>failed to load</div>;
    }
    if (!data) {
        console.log("Loading");
        return <div>loading...</div>;
    }
  
    const { query } = data;*/
  
    console.log("IP is " + ipData);
    /*return (
      <div>
        <p>IP: {query}</p>
      </div>
    );*/
    return query;
    
}

const getPost = async (id) => {
  
    const ip = "888.888.888.8888";
  
    const response = await sendID(ip, id)
          .then((data) => {
  
              //Success
              if (data['code'] === 1) {
  
                  console.log("Code is " + data['code']);

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
  
      return (
          response
      );
};

async function sendID (ip, id) {

    console.log("IP : " + ip);
    console.log("ID : " + id);
    console.log("Website : " + ANON_POST_DETAILS);

    if (ip.length > 0) {

        //Data Object to Pass Through
        const DetailRequest = {
            postId: id,
            ip: ip,
        }
    
        //console.log("JSON : " + JSON.stringify(DetailRequest));

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
