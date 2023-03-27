import jwt from 'jsonwebtoken';

export const extractUserFromToken = (tokenLocation) => {
    if (tokenLocation) {
        const token = tokenLocation.split(' ')[1];

        let user;

        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            user = data;
        }

        return user;
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
}
