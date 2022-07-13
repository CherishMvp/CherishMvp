//引入module
const nodemailer = require("nodemailer");
//发送邮件

// 邮件发送函数；在同级目录submqtt下被引用。但满足条件的时候直接调用。


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function sendMail() {
  //html 页面内容
  const html = '<p>实验室环境异常！请登录小程序或PC端及时查看。</p><a href="https://www.ai0626.top/cherish">点击跳转</a>' //页面内容

  console.log(html);
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'lookcherish@163.com', // generated ethereal user
      pass: 'WYUUFXQXTDAOLAHT' // generated ethereal password
    }
  });

  let mailOptions = {
    from: '"lookcherish@163.com"', // sender address
    to: "1959928946@qq.com,bbttcherish@outlook.com", // list of receivers
    subject: "实验室环境信息", // Subject line
    html: html // html body
  };
  
  // await sleep(3000)
  // setInterval(() => {
    transporter.sendMail(mailOptions, (error, info = {}) => {
      if (error) {
        console.log(error);
      } else {
        console.log('发送成功')
      }
    });
  // }, 3000)

  


  

}

// sendMail()

module.exports = sendMail