import db from "../models";
import bcrypt from "bcryptjs";
require('dotenv').config();
import jwt from "jsonwebtoken";
import { v4 } from "uuid"
const nodemailer = require('nodemailer');

// tạo mật khẩu ngẫu nhiên
function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
// đăng ký
const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const registerService = async ({ username, email, password, role }) => {
    try {
        const response = await db.user.findOrCreate({
            where: { email },
            defaults: {
                id: v4(),
                username: username,
                email: email,
                password: hash(password),
                role: role,
                isActive: 1
            }
        });
        const token = response[1] && jwt.sign({ id: response[0].id, email: response[0].email }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return ({
            err: token ? 0 : 2,
            msg: token ? 'Tạo tài khoản thành công!' : 'Email đã được sử dụng. Vui lòng thay đổi một email khác!',
            //token: token || null
        });
    } catch (error) {
        throw (error)
    }
}
// đăng nhập
export const loginService = async ({ email, password }) => {
    try {
        const response = await db.user.findOne({
            where: { email },
            raw: true,
        });
        const isCorrectPass = response && bcrypt.compareSync(password, response.password)
        const token = isCorrectPass && jwt.sign({ id: response.id, email: response.email, username: response.username, role: response.role }, process.env.SECRET_KEY, { expiresIn: '1d' });
        return ({
            err: token ? 0 : 2,
            msg: token ? 'Đăng nhập thành công!' : response ? 'Mật khẩu không chính xác!!' : "Email không tồn tại!",
            token: token || null,
        });
    } catch (error) {
        throw (error)
    }
}
// đổi mật khẩu
export const changePassService = async ({ email, password, newpassword, role }) => {
    switch (role) {
        case 'admin':
            const response = await db.user.findOne({
                where: { email },
                raw: true
            });
            if (response) {
                try {
                    await db.user.update({ password: hash(newpassword) }, {
                        where: {
                            email,
                        },
                    });
                    return ({
                        err: 0,
                        msg: "Thay đổi mật khẩu thành công!"
                    })
                } catch (error) {
                    // console.log(error)
                    return ({
                        err: 2,
                        msg: "Không thể update mật khẩu!"
                    })
                }
            } else {
                return ({
                    err: 2,
                    msg: "Thông tin tài khoản hoặc mật khẩu không chính xác!"
                })
            }
        default:
            try {
                const response = await db.user.findOne({
                    where: { email },
                    raw: true
                });
                const isCorrectPass = response && bcrypt.compareSync(password, response.password)
                if (isCorrectPass) {
                    try {
                        await db.user.update({ password: hash(newpassword) }, {
                            where: {
                                email,
                            },
                        });
                        return ({
                            err: 0,
                            msg: "Thay đổi mật khẩu thành công!"
                        })
                    } catch (error) {
                        // console.log(error)
                        return ({
                            err: 2,
                            msg: "Không thể update mật khẩu!"
                        })
                    }
                } else {
                    return ({
                        err: 2,
                        msg: "Thông tin tài khoản hoặc mật khẩu không chính xác!"
                    })
                }

            } catch (error) {
                throw (error)
            }
    }
}
// lấy lại mật khẩu
export const getPassService = ({ email }) => new Promise(async (resolve, reject) => {
    const newPass = generateRandomPassword(8)
    try {
        const response = await db.user.findOne({
            where: { email },
            raw: true
        });
        if (response) {
            try {
                await db.user.update({ password: hash(newPass) }, {
                    where: {
                        email,
                    },
                });
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com', // Host của Gmail
                    port: 465, // Cổng SMTP của Gmail
                    secure: true,
                    auth: {
                        user: process.env.MAILER_EMAIL,
                        pass: process.env.PASS_EMAIL
                    }
                });
                let mailOptions = {
                    from: process.env.MAILER_EMAIL,
                    to: response.email,
                    subject: 'Lấy lại mật khẩu',
                    html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Email Template</title>
                            <style>
                                /* CSS styles go here */
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background-color: #ffffff;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    border-radius: 10px;
                                    box-sizing: border-box;
                                }
                                h1 {
                                    color: #333333;
                                }
                                p {
                                    color: #666666;
                                }
                                .button {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    background-color: #007bff;
                                    color: #ffffff;
                                    text-decoration: none;
                                    border-radius: 5px;
                                }
                                .bottom-bar {
                                    margin-top: 20px;
                                    padding-top: 20px;
                                    border-top: 1px solid #dddddd;
                                    text-align: center;
                                }
                                .pass {
                                    display: flex;
                                    justify-content: center; 
                                    align-items: center;
                                    font-size: 16px;
                                }
                                
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Lấy lại mật khẩu</h1>
                                <p>Mật khẩu của bạn đã được thay đổi. Dưới đây là mật khẩu mới của bạn:</p>
                                <p class="pass"><strong>${newPass}</strong></p>
                                <a href="#" class="button">Đăng nhập</a>
                                <div class="bottom-bar">
                                    <p>Nếu có bất kỳ câu hỏi hoặc thắc mắc, vui lòng liên hệ với chúng tôi:</p>
                                    <p>Email: devtester0321@gmail.com</p>
                                    <p>Điện thoại: 0987654321</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                };

                // Gửi email và xử lý kết quả
                transporter.sendMail(mailOptions, (error, info) => {
                    resolve({
                        err: error ? 2 : 0,
                        msg: error ? `Không thể gửi thông tin đến ${email}.` : `Mật khẩu mới đã được gửi đến ${email}. Vui lòng kiểm tra email của bạn.`
                    })
                });
            } catch (error) {
                // console.log(error)
                resolve({
                    err: 2,
                    msg: "Không thể update mật khẩu!"
                })
            }

        } else {
            resolve({
                err: 2,
                msg: "Email không tồn tại! Vui lòng kiểm tra lại thông tin",
            })
        }
    } catch (error) {
        reject(error)
    }
});

// log, unlock account
export const stateService = async ({ id, isActive }) => {
    try {
        const response = await db.user.findOne({ where: { id } });
        if (response) {
            const rs = db.user.update({ isActive : !isActive }, { where: { id } });
            return {
                err: rs ? 0 : 2,
                msg: rs ? 'Thành công' : 'Không thành công'
            }
        } else {
            return {
                err: 2,
                msg: 'Tài khoản không tồn tại'
            }
        }
    } catch (error) {
        throw (error)
    }
}
// get account 
export const getAccountService = async () => {

    try {
        const response = await db.user.findAll({
            attributes: ['id', 'username', 'email', 'isActive', 'role']
        });
        return response;
    } catch (error) {
        throw error;
    }
}
// deleete account
export const deleteAccountService = async ({ id }) => {
    try {
        const response = await db.user.delete({
            where: { id }
        });
        return {
            err: response ? 0 : 2,
            msg: response ? 'Thành công!' : "Không thành công. Có lỗi xảy ra."
        }
    } catch (error) {
        throw error;
    }
}

