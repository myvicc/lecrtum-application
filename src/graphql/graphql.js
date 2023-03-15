import {v4} from 'uuid';

const students = new Map();
const teachers = new Map();
const regExp = /^[\dA-Z]{8,}/i

export const typeDefs = `
    type Query {
      student(id: String!): Student,
      teacher(id: String!): Teacher
    }  
    
    type Mutation {
      signUpStudent(body: SignupStudentBody!): Student
      signUpTeacher(body: SignupTeacherBody!): Teacher
    }  
    
    type Student {
      id: String!
      username: String!
      email: String!
    }
    
    type Teacher {
      id: String!
      username: String!
      email: String!
    }
    
    input SignupStudentBody {
      username: String!
      email: String!
      password: String!
    }    
    
    input SignupTeacherBody {
      username: String!
      email: String!
      password: String!
    } 
`;

export const resolvers = {
    Query: {
        student: (parent, args) => {
            const student = students.get(args.id);
            console.log(student);
            return student;
        },
        teacher: (parent, args) => {
            const teacher = teachers.get(args.id);
            console.log(teacher);
            return teacher;
        }
    },
    Mutation: {
        signUpStudent: (parent, args) => {
            const {username, email, password} = args.body;
            const student = {
                id: v4(),
                username,
                email: email,
                password
            }

            Array.from(students.values()).forEach((item) => {
                if (item.email === email) {
                    throw new Error(`Student with email ${email} has already existed`);
                }
            })

            if (!password.match(regExp)) {
                throw new Error("Password must be more than 8 symbols (only numbers and letters)");
            }

            console.log(students);
            students.set(student.id, student);
            return student;
        },

        signUpTeacher: (parent, args) => {
            const {username, email, password} = args.body;
            const teacher = {
                id: v4(),
                username,
                email,
                password
            }

            Array.from(teachers.values()).forEach((item) => {
                if (item.email === email) {
                    throw new Error(`Teacher with email ${email} has already existed`);
                }
            })

            if (!password.match(regExp)) {
                throw new Error("Password must be more than 8 symbols (only numbers and letters)");
            }

            console.log(teachers);
            students.set(teacher.id, teacher);
            return teacher;
        }
    }
}
