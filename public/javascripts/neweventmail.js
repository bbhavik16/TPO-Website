const nodemailer = require('nodemailer');
module.exports.sendMail = function(output)
{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:"tpowebsite2021@gmail.com",
          pass:"Copiedyelp2021"
        }
      })
      const mailOptions={
        from: 'tpowebsite2021@gmail.com', // sender address
          to: ["patilnishant0311@gmail.com"], // list of receivers
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

