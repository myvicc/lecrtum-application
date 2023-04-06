import {StatsService} from '../../services/stats.service';


export class StatsController {
    constructor() {
        this.service = new StatsService();
    }

    async getUserStats(request, response) {
        try {
            const {type} = request.query;
            const userStats = await this.service.getUserStats(type);

            return response.json(userStats);
        } catch (e) {
            console.log(e);

            response.status(500).send('Something bad happened');

        }
    }

    async getNumberOfOnlineStudents(request, response) {
        try {
            const count = await this.service.countStudents({online: true});

            return response.json(count);
        } catch (e) {
            console.log(e)

            response.status(500).send('Something bad happened');
        }
    }

    async getNumberOfOnlineTeachers(request, response) {
        try {
            const count = await this.service.countTeacher({online: true});

            return response.json(count);
        } catch (e) {
            console.log(e)

            response.status(500).send('Something bad happened');
        }
    }

    async getNumberOfRegisteredStudents(request, response) {
        try {
            const count = await this.service.countStudents();

            return response.json(count);
        } catch (error) {
            console.log(error);

            response.status(500).send('Something bad happened');
        }
    }

    async getNumberOfRegisteredTeachers(request, response) {
        try {
            const count = await this.service.countTeacher();

            return response.json(count);
        } catch (error) {
            console.log(error);

            response.status(500).send('Something bad happened');
        }
    }

}
