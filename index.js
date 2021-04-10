const express = require('express')
const app = express()
const port = 8064

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/grab/', (req, res) => {

  var params = req.query.params;
  var destfile = req.query.file;
  const execSync = require('child_process').execSync;
  code = execSync('node /home/ubuntu/nodeserver/screenshot.js '+params+' '+destfile);
  //res.send({params: params, file: destfile});
  res.redirect('http://ec2-3-141-3-111.us-east-2.compute.amazonaws.com:8064/'+destfile);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};
