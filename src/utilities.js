import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const storeS3 = async (file) => {
    const { createReadStream, filename, mimetype } = file;

    const streamIn = createReadStream();

    const client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        }
    });

    const Key = `${uuidv4()}-${filename}`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key,
        Body: streamIn
    };

    const upload = new Upload({
        client,
        params
    });

    await upload.done();

    return {
        fileName: filename,
        mimeType: mimetype,
        path: Key
    };
};

export const removeFromS3 = async (key) => {
    const client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        }
    });

    return client.send(new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key
    }));
};

export const fileTypeIsCorrect = (file, allowedTypes) => {
    if (!allowedTypes.find(type => {
        const regex = new RegExp(type);

        return regex.test(file.mimetype);
    })) {
        throw new Error(`Дозволені типи файлів: ${allowedTypes.join(', ')}`);
    }
}

export function checkUserType(user, type) {
    if (user.type !== type) {
        throw new Error('Unauthorized');
    }
}

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

