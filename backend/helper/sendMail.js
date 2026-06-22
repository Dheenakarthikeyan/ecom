import nodemailer from "nodemailer";

export const sendMail = async ({
    email,
    subject,
    message,
    htmlMessage
}) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            text: message, 
            html: htmlMessage
        };

        const info = await transporter.sendMail(mailOptions);//email send process

        console.log("Email Sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("Email Error:", error);
        throw error;
    }
};