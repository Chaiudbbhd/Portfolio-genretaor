import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { templateId, name, email, about, github, linkedin, instagram, facebook, twitter, youtube, projects, articles, skills } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    // Mail content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ["yourEmail@gmail.com", "yourFriend@gmail.com"], // both you + friend
      subject: `New Portfolio Submission - ${templateId}`,
      html: `
        <h2>New Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>About:</b> ${about}</p>
        <p><b>Github:</b> ${github}</p>
        <p><b>LinkedIn:</b> ${linkedin}</p>
        <p><b>Instagram:</b> ${instagram}</p>
        <p><b>Facebook:</b> ${facebook}</p>
        <p><b>Twitter:</b> ${twitter}</p>
        <p><b>YouTube:</b> ${youtube}</p>
        <p><b>Projects:</b> ${projects}</p>
        <p><b>Articles:</b> ${articles}</p>
        <p><b>Skills:</b> ${skills}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
