const nodemailer = require('nodemailer');

module.exports.sendMail = async function(output,allUsers)
{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:"tpowebsite2021@gmail.com",
          pass:process.env.TPO_PASSWORD
        }
      })
      
      const mailOptions={
        from: 'tpowebsite2021@gmail.com', // sender address
          to: allUsers, // list of receivers
          subject: "New Event:TPO-VJTI", // Subject line
        //   text: "AA jaana Bhai bhul mat jaana", // plain text body
          html:output
        }
      transporter.sendMail(mailOptions,function(err,data){
      if(err)
      {console.log("error is",err);}
      else
      {console.log("Mail sent");}
    })    
}