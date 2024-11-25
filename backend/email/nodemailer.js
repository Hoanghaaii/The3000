import nodemailer from 'nodemailer'

export const sendVerifyCode = async (email, verifyCode)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: `Verify Email`,
            html: `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f7fc;
                                margin: 0;
                                padding: 0;
                            }
                            .email-container {
                                width: 100%;
                                max-width: 600px;
                                margin: 30px auto;
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 8px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                text-align: center;
                            }
                            .email-header h1 {
                                color: #4A90E2;
                                font-size: 36px;
                                margin-bottom: 20px;
                            }
                            .email-body {
                                font-size: 16px;
                                color: #333333;
                                line-height: 1.5;
                                margin-bottom: 30px;
                            }
                            .verify-token {
                                font-size: 24px;
                                font-weight: bold;
                                color: #4A90E2;
                                margin-top: 20px;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                font-size: 12px;
                                color: #777777;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="email-header">
                                <h1>Welcome to The 3000!</h1>
                            </div>
                            <div class="email-body">
                                <p>Xin chào,</p>
                                <p>Cảm ơn đã đăng ký trở thành thành viên của chúng tôi. Mã Code để xác thực email của bạn ở bên dưới: </p>
                                <div class="verify-token">${verifyCode}</div>
                                <p>Nếu không phải bạn thực hiện yêu cầu, xin hãy bỏ qua email này.</p>
                            </div>
                            <div class="footer">
                                <p>Chân thành cảm ơn!</p>
                                <p>The 3000</p>
                                <p>&copy; 2024. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
        }
        await transporter.sendMail(mailOptions)
        console.log(`Verification email sent to ${email}`)
    } catch (error) {
        console.log("Error sending verification email: ", error)
        throw new Error("Failed to send email.")
    }
}

export const sendResetPassword = async (email, resetLink)=>{
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: `Reset Link`,
            html: `
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f7fc;
                                margin: 0;
                                padding: 0;
                            }
                            .email-container {
                                width: 100%;
                                max-width: 600px;
                                margin: 30px auto;
                                background-color: #ffffff;
                                padding: 30px;
                                border-radius: 8px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                text-align: center;
                            }
                            .email-header h1 {
                                color: #4A90E2;
                                font-size: 36px;
                                margin-bottom: 20px;
                            }
                            .email-body {
                                font-size: 16px;
                                color: #333333;
                                line-height: 1.5;
                                margin-bottom: 30px;
                            }
                            .verify-token {
                                font-size: 24px;
                                font-weight: bold;
                                color: #4A90E2;
                                margin-top: 20px;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 30px;
                                font-size: 12px;
                                color: #777777;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="email-header">
                                <h1>Welcome to The 3000!</h1>
                            </div>
                            <div class="email-body">
                                <p>Xin chào,</p>
                                <p>Chúng tôi đã gửi link reset password, hãy nhấn vào link bên dưới để đổi mật khẩu </p>
                                <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #4A90E2; text-decoration: none; border-radius: 5px;">Đổi mật khẩu</a>
                                <p>Nếu không phải bạn thực hiện yêu cầu, xin hãy bỏ qua email này.</p>
                            </div>
                            <div class="footer">
                                <p>Chân thành cảm ơn!</p>
                                <p>The 3000</p>
                                <p>&copy; 2024. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `
        }
        await transporter.sendMail(mailOptions)
        console.log(`Verification email sent to ${email}`)
    } catch (error) {
        console.log("Error sending verification email: ", error)
        throw new Error("Failed to send email.")
    }
}

