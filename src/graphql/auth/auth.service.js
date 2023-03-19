import bcrypt from "bcrypt";

import { Student } from "../../mongo";
import { Teacher } from "../../mongo";
import { passwordIsCorrect } from "../../utilities";

export class AuthService {
    async signupStudent(body) {
        const existingStudent = await Student.findOne({ email: body.email });

        if (existingStudent) {
            throw new Error("Студент з таким email вже існує");
        }

        if (!passwordIsCorrect(body.password)) {
            throw new Error("Пароль не відповідає вимогам");
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
            throw new Error("Преподаватель з таким email вже існує");
        }

        if (!passwordIsCorrect(body.password)) {
            throw new Error("Пароль не відповідає вимогам");
        }

        const teacher = new Teacher({
            username: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        });

        await teacher.save();

        return teacher.toResponse();
    }
}
