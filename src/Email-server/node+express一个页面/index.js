//引入module
// const nodemailer = require("nodemailer");

let nodemailer = require('nodemailer');
let express = require('express');
let app = express();
let mailTransport = nodemailer.createTransport({
  host: "smtp.163.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'lookcherish@163.com', // generated ethereal user
    pass: 'WYUUFXQXTDAOLAHT' // generated ethereal password
  }
})


app.get('/send',function(req,res) {
  let options = {
      from: ' "zwt" lookcherish@163.com',
      to: '1959928946@qq.com',
      bcc: '密送',
      subject: 'node邮件',
      text: '实验室邮件来袭',
      html: '<h1>hello zwt</h1>'
  };
  mailTransport.sendMail(options,function(err,msg) {
      if(err) {
          console.log(err);
          res.send(err);
      } else {
          res.send('success');
      }
  })
});



app.listen(8003,function() {
  console.log('running...');
})

