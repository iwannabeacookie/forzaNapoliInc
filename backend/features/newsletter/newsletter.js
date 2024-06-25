import sgMail from "@sendgrid/mail";
import userSchema from "../user-auth/models/userModel.js";

// Initialize email service
sgMail.setApiKey(process.env.TWILIO_API_KEY);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Grabs all of the users that are currently subscribed to the newsletter
 */
async function getUserInfo() {
  const users = await userSchema.find({ newsletter: true });
  console.info("Users subscribed:", users);
  return users;
}
/**
 * Sends the newsletter to the user
 * @param customerEmail
 * @param customerName
 */
async function sendNewsletter(customerEmail, customerName) {
  const mailOptions = {
    from: process.env.SOURCE_EMAIL, // Sender address
    to: customerEmail, // List of recipients
    subject: "Your Newsletter Is HERE!", // Subject line
    text: `Dear ${customerName},\n\nYour newsletter content here...`, // Plain text body
    html: `<p>Dear ${customerName},</p><p>Your newsletter content here...</p>`, // HTML body
  };

  return sgMail.send(mailOptions);
}

/**
 * Sends newsletters to all users who chose to receive it
 */
export async function sendAllNewsletters() {
  console.info("Source email:", process.env.SOURCE_EMAIL);
  let users = await getUserInfo();
  try {
    users.forEach(async (user) => {
      if (user.email === undefined) {
        console.error(
          "A user has an undefined email! Skipping. Full user:",
          user,
        );
        return;
      }
      console.info("Sending newsletter to:", user.email);
      return await sendNewsletter(user.email, user.name);
    });
    console.info("Finished sending emails");
    return true;
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return false;
  }
}

/**
 * Change the status of the user's newsletter subscription
 * @param userEmail The email of the user, in order to identify him
 * @param newsletterVal The new useletter Value
 * @returns returns the newsellter's new staturs
 */
export async function updateNewsletter(userEmail, newsletterVal) {
  await userSchema.updateOne(
    { email: userEmail },
    { $set: { newsletter: newsletterVal } },
  );
  try {
    const { newsletter } = await userSchema.findOne({ email: userEmail });
    console.info("Updated newsletter:", newsletter);
    return newsletter;
  } catch (err) {
    console.error("Error finding newsletter user:", err);
    return "Invalid Email";
  }
}
