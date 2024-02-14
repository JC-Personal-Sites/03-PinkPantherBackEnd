// import Crypto from "crypto";
// import datefns from "date-fns";
// import nodeMailer from "nodemailer";
// import UserSchema from "../Users/Users-Model";

// class RestorePasswordService {
//   async newPasswordForExistingUser(data, type) {
//     let resetTokken = Crypto.randomBytes(20).toString("hex");
//     const dateSet = new Date();

//     await UserSchema.updateOne(
//       {
//         "logonData.logonEmailAddress": data.email,
//       },
//       {
//         $set: {
//           "logonData.resetPasswordToken": resetTokken,
//           "logonData.resetPasswordSent": dateSet,
//           "logonData.resetPasswordExpires": datefns.add(dateSet, { minutes: 10 }),
//         },
//       }
//     );

//     await UserSchema.updateOne(
//       {
//         "logonData.logonEmailAddress": data.email,
//       },
//       {
//         $set: {
//           "logonData.lockedOut": false,
//         },
//       }
//     );

//     let transporter = nodeMailer.createTransport({
//       host: process.env.NODEMAIL_HOST,
//       port: process.env.NODEMAIL_PORT,
//       secure: false,
//       auth: {
//         user: process.env.NODEMAIL_USER,
//         pass: process.env.NODEMAIL_PASS,
//       },
//     });

//     let mailOptions = {
//       from: "bowlerit@bowlereggs.co.uk",
//       to: data.email,
//       subject: type === "New" ? "Set password for your new Bowler Eggs account" : "Reset Bowler Eggs Account Password",
//       html: `${
//         type === "New"
//           ? "<p>You are receiving this because your new Bowler Eggs FMS account requires a password setting on it.</p>"
//           : "<p>You are receiving this because you (or someone else) has requested the reset of the password for your Bowler Eggs FMS account.</p>"
//       }
//           <p>Your username is: <b>${data.logonName}</b></p>
//           <p>Please click on the following link, or paste this into your browser to complete the process:</P>
//           <a href="${process.env.EMAIL_TEMPLATE_URL}/pages/resetpassword/${data.logonName}/${
//         data.email
//       }/${resetTokken}">${type === "New" ? "New Password" : "Reset Password"}</a>
//           <P>If you did not request this, please ignore this email and your password will remain unchanged</P>`,
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return error;
//       }
//       this.res.render("index");
//     });
//   }
// }

// export default RestorePasswordService;
