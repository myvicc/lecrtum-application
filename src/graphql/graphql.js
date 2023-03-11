import {v4} from 'uuid';

const students = new Map();
const teachers = new Map();


export const typeDefs = `
    type Query {
      student(id: String!): Student,
    }  
    
    type Mutation {
      signUpStudent(body: SignupStudentBody!): Student
    }  
    
    type Student {
      id: String!
      username: String!
      email: String!
    }
    
    input SignupStudentBody {
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

            console.log(students);
            students.set(student.id, student);
            return student;
        }
    }
}