import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import "dotenv/config";


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});


const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "BizTask",
    link: process.env.FRONT_END_URL
  }
});


const sendMail = async ({to,subject,name, intro,tableData = [], outro}) => {
  
    try {
    const emailBody = {
      body: {
        name,
        intro,
        table: tableData.length
          ? { data: tableData }
          : undefined,
        outro
      }
    };

    const mail = {
      from: process.env.NODEMAILER_MAIL,
      to,
      subject,
      html: mailGenerator.generate(emailBody)
    };

    await transporter.sendMail(mail);

   
    return { success: true,message:` Email sent successfully to: ${to}` };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export default sendMail;
