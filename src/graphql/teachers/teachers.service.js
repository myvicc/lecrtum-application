import { ObjectId } from "mongodb";
import { Teacher } from "../../mongo";

export class TeachersService {
    async getTeacher(id) {
        return Teacher.findById(new ObjectId(id));
    }
}
