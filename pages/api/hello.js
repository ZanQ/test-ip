// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}*/

export default function handle(req, res) {

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (ip.substr(0, 7) == "::ffff:") {
              ip = ip.substr(7)
  }

  res.send(ip)
  //res.json({ clientIP : ip })
}