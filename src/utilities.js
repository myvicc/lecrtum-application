import {Teacher} from './mongo';
import {ObjectId} from 'mongodb';

export const passwordIsCorrect = (password) => {
    if (password.length < 8) {
        throw new Error("Пароль дуже короткий");
    }

    const regex = new RegExp(/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/gi);

    return regex.test(password);
};

export const checkEmail = (map, email) => {
    for (let [key, value] of map.entries()) {
        if (value.email === email) return key;
    }
};

export const teacherIsBusy = async (date, timeStart, timeEnd, teacherId) => {
    const currentTeacher = await Teacher.findById(new ObjectId(teacherId));

    if (!currentTeacher) {
        throw new Error("teacher not found");
    }
    const existingSlot = currentTeacher.blockedSlots.find((slot) => slot.date.toISOString() === date.toISOString()
        && slot.timeStart === timeStart && slot.timeEnd === timeEnd);
    if (existingSlot) {
        throw new Error('teacher is busy')
    }
}
export const checkOfLesson = (timeStart, timeEnd) => {
    if (!(+timeStart === 16 || +timeStart === 17 || +timeStart === 18 || +timeStart ===19)) {

        throw new Error("Lesson should start from 16 till 19 and at the beginning of hour");
    }
    if (+timeEnd - +timeStart !== 1) {
        throw new Error("Lesson should last 1 hour");
    }
}

