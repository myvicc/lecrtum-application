import jwt from 'jsonwebtoken';
import { createWriteStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const fileTypeIsCorrect = ({file}, allowedTypes) => {
    if (!allowedTypes.includes(file.mimetype)) {
        throw new Error(`Дозволені типи файлів: ${allowedTypes.join(', ')}`);
    }
}

export function checkUserType(user, type) {
    if (user.type !== type) {
        throw new Error('Unauthorized');
    }
}

export const storeLocally = async ({ file }) => {
    const { createReadStream, filename, mimetype } = file;

    const path = `${process.cwd()}/files/${uuidv4()}-${filename}`;

    const streamIn = createReadStream();

    const streamOut = createWriteStream(path);

    streamIn.pipe(streamOut);

    await new Promise((resolve, reject) => {
        streamOut.on('error', (error) => reject(error));
        streamOut.on('finish', resolve);
    });

    return {
        fileName: filename,
        mimeType: mimetype,
        path
    };
};

export const extractUserFromToken = (tokenLocation) => {
    if (!tokenLocation) {
        return null;
    }

    let user;

    const token = tokenLocation.split(' ')[1];

    if (token) {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        user = data;
    }

    return user;
};


export const passwordIsCorrect = (password) => {
    if (password.length < 8) {
        throw new Error('Пароль дуже короткий');
    }

    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi);

    return regex.test(password);
};

export const checkEmail = (map, email) => {
    for (let [key, value] of map.entries()) {
        if (value.email === email) return key;
    }
};

export const isTimeSlotValid = ({ date, timeStart, timeEnd }) => {
    if (timeStart < 16 || timeEnd > 20) {
        return false;
    }

    const slotDuration = timeEnd - timeStart;

    if (slotDuration > 1 || slotDuration < 0) {
        return false;
    }

    if (new Date(date) < new Date()) {
        return false;
    }

    return true;
}