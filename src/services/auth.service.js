import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Student, Teacher } from '../mongo';
import { passwordIsCorrect } from '../utilities';
import {ObjectId} from 'mongodb';

export class AuthService {
    async signupStudent(body) {
        const existingStudent = await Student.findOne({ email: body.email });

        if (existingStudent) {
            throw new Error('Студент з таким email вже існує');
        }

        if (!passwordIsCorrect(body.password)) {
            throw new Error('Пароль не відповідає вимогам');
        }

        const student = new Student({
            username: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        });

        await student.save();

        return student.toResponse();
    }

    async signupTeacher(body) {
        const existingTeacher = await Teacher.findOne({ email: body.email });

        if (existingTeacher) {
            throw new Error('Викладач з таким email вже існує');
        }

        if (!passwordIsCorrect(body.password)) {
            throw new Error('Пароль не відповідає вимогам');
        }

        const teacher = new Teacher({
            username: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        });

        await teacher.save();

        return teacher.toResponse();
    }

    async loginStudent(body) {
        const student = await Student.findOne({ email: body.email });

        if(!student) {
            throw new Error('Введені дані невірні');
        }

        const isPasswordValid = await bcrypt.compare(body.password, student.password);

        if(!isPasswordValid) {
            throw new Error('Введені дані невірні');
        }
        student.online = true;
        await  student.save();

        return jwt.sign({ id: student.id, type: 'STUDENT' }, process.env.JWT_SECRET);
    }

    async loginTeacher(body) {
        const teacher = await Teacher.findOne({ email: body.email });

        if(!teacher) {
            throw new Error('Введені дані невірні');
        }

        const isPasswordValid = await bcrypt.compare(body.password, teacher.password);

        if(!isPasswordValid) {
            throw new Error('Введені дані невірні');
        }

        teacher.online = true;
        await teacher.save();

        return jwt.sign({ id: teacher.id, type: 'TEACHER' }, process.env.JWT_SECRET);
    }
    async logoutStudent(studentId) {
        const student = await Student.findById(new ObjectId(studentId));

        if (!student) {
            throw new Error('Студент не знайдений');
        }

        student.online = false;

        await  student.save();

        return 'Ok';
    }

    async logoutTeacher(teacherId) {
        const teacher = await Teacher.findById(new ObjectId(teacherId));

        if (!teacher) {
            throw new Error('Викладач не знайдений');
        }

        teacher.online = false;

        await teacher.save();

        return 'Ok';
    }

}

