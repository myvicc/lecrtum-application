import { scalarsDef } from './scalars';
import {directivesDef} from './directives';

const Common = `
  ${scalarsDef}
  
  ${directivesDef}

  type Student {
    id: String!
    username: String!
    email: String!
  }

  type Teacher {
    id: String!
    username: String!
    email: String!
    blockedSlots: [TimeSlot]
  }

  type TimeSlot {
    date: String!
    timeStart: Int!
    timeEnd: Int!
  }

  type Lesson {
    id: String!
    date: String!
    timeStart: Int!
    timeEnd: Int!
    teacherId: String!
    studentId: String!
  }

  type Review {
    id: String!
    date: String!
    text: String!
    teacherId: String!
    studentId: String!
  }

  type File {
    id: String!
    fileName: String!
    path: String!
    mimeType: String!
    studentsAccess: String!
  }
`;

export default Common;

