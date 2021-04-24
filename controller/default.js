const nodemailer = require("nodemailer");
const fs = require('fs'); 

const sendMail = async (req, res) => {

  // DEFINE HERE THE PARAMETER OF YOUR EMAIL
  let firstname;
  let lastname;
  let email;
  let message;
  if (req !== undefined) {
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { message } = req.body;
  }

  // THIS IS THE PATH OF YOUR EMAIL TEMPLATE IF YOU WANT TO USE AN HTML TEMPLATE
  let data = fs.readFileSync('./emails/default.html', {encoding:'utf8', flag:'r'}); 

  // REPLACE THE PLACEHOLDERS IN THE MAIL WITH THE INFORMATIONS FROM THE POST REQUEST
  data = data.replace(/{%firstname%}/g, firstname);
  data = data.replace(/{%lastname%}/g, lastname);              
  data = data.replace(/{%email%}/g, email);              
  data = data.replace(/{%message%}/g, message);              


  let transporter = nodemailer.createTransport({
    // ADD YOUR DOMAIN HERE (AND LEAVE HOST, PORT AS THEY ARE)
    name: "your-domain.ch", 
    host: "smtp.coresender.com",
    port: 587,
    secure: false, 
    auth: {
      // GO TO 'coresender.com' CREATE AN ACCOUNT AND ADD YOUR CREDENTIALS HERE:
      user: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
      pass: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
    },
  });

  await transporter.sendMail({
    // ADD THE DATA OF YOUR EMAIL HERE:
    from: 'your-sender-address@yellowreach.io',
    to: 'your-receiver-address@yellowreach.io', 
    subject: "Subject of your message", 
    text: "Text content of your email", 
    html: data,
  });

  // ON SUCCESS - PRINT MESSAGE AND RESPOND WITH A 200 STATUS CODE
  console.log("📩  Message sent!");
  res.status(200);
  res.send(`📩  Message is successfully sent to: hello@jeromehaas.dev`);

};

// ON ERROR - PRINT ERROR MESSAGE TO THE TERMINAL
sendMail().catch(console.error)

module.exports = {
  sendMail,
};
