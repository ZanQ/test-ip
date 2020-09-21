import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ipurl = "http://localhost:3000/api/hello";

function Page({ ip }) {
  const router = useRouter()
  const { page } = router.query

  return <div>Next stars: {ip} with Page: {page}</div> 
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch(ipurl)
  const json = await res.json()
  return { ip: json.clientIP }
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