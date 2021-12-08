import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import users from '../models/users.js';

const secret = 'MY_PRIVATE_KEY';
export function login (email, password) {
    return new Promise(async (resolve, reject) => {
        const userModel = users(db);
        const user = await userModel.findOne({ where: { email } });

        if (!user)  {
            reject('There is any user with given email');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          reject('Usuario o contraseña incorrecta');
        }
        const token = jwt.sign({
            data: user,
        }, secret, { expiresIn: 60 * 60 });
        resolve({ user, token });
    });
}

export function verifyToken (token) {
    return new Promise((resolve) => {
        const verified = jwt.verify(token, secret);
        resolve(verified);
    });
}
