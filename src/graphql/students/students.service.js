import { ObjectId } from "mongodb"
import { Student } from "../../mongo";

export class StudentsService {
    async getStudent(id) {
        return Student.findById(new ObjectId(id));
    }
}
