import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import PermissionsRole from 'App/Models/PermissionsRole'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await Permission.createMany([
      { url: '/Rubrics', method: 'GET' },
      { url: '/Rubrics', method: 'POST' },
      { url: '/Rubrics', method: 'PUT' },
      { url: '/Rubrics', method: 'DELETE' },
      { url: '/Subjects', method: 'GET' },
      { url: '/Subjects', method: 'POST' },
      { url: '/Subjects', method: 'PUT' },
      { url: '/Subjects', method: 'DELETE' },
      { url: '/Evaluations', method: 'GET' },
      { url: '/Evaluations', method: 'POST' },
      { url: '/Evaluations', method: 'PUT' },
      { url: '/Evaluations', method: 'DELETE' },
      { url: '/Activities', method: 'GET' },
      { url: '/Activities', method: 'POST' },
      { url: '/Activities', method: 'PUT' },
      { url: '/Activities', method: 'DELETE' },
      { url: '/Indicators', method: 'GET' },
      { url: '/Indicators', method: 'POST' },
      { url: '/Indicators', method: 'PUT' },
      { url: '/Indicators', method: 'DELETE' },
      { url: '/OutcomesSubjects', method: 'GET' },
      { url: '/OutcomesSubjects', method: 'POST' },
      { url: '/OutcomesSubjects', method: 'PUT' },
      { url: '/OutcomesSubjects', method: 'DELETE' },
      { url: '/ProffesorsSubjects', method: 'GET' },
      { url: '/ProffesorsSubjects', method: 'POST' },
      { url: '/ProffesorsSubjects', method: 'PUT' },
      { url: '/ProffesorsSubjects', method: 'DELETE' },
      { url: '/StudentsOutcomes', method: 'GET' },
      { url: '/StudentsOutcomes', method: 'POST' },
      { url: '/StudentsOutcomes', method: 'PUT' },
      { url: '/StudentsOutcomes', method: 'DELETE' },
      { url: '/IndicatorsRubrics', method: 'GET' },
      { url: '/IndicatorsRubrics', method: 'POST' },
      { url: '/IndicatorsRubrics', method: 'PUT' },
      { url: '/IndicatorsRubrics', method: 'DELETE' },
      { url: '/Users', method: 'GET' },
      { url: '/Users', method: 'POST' },
      { url: '/Users', method: 'PUT' },
      { url: '/Users', method: 'DELETE' },
      { url: '/Permissions', method: 'GET' },
      { url: '/Permissions', method: 'POST' },
      { url: '/Permissions', method: 'PUT' },
      { url: '/Permissions', method: 'DELETE' },
      { url: '/Roles', method: 'GET' },
      { url: '/Roles', method: 'POST' },
      { url: '/Roles', method: 'PUT' },
      { url: '/Roles', method: 'DELETE' },
      { url: '/PermissionsRoles', method: 'GET' },
      { url: '/PermissionsRoles', method: 'POST' },
      { url: '/PermissionsRoles', method: 'PUT' },
      { url: '/PermissionsRoles', method: 'DELETE' },
    ])

    await Role.createMany([
      {name: 'Administrator'},
      {name: 'Coordinator'}, //Usuario, porque solo ve
      {name: 'Leader'},
      {name: 'Proffesor'},
    ])

    await PermissionsRole.createMany([
      {role_id: 1, permission_id: 1},
      {role_id: 1, permission_id: 2},
      {role_id: 1, permission_id: 3},
      {role_id: 1, permission_id: 4},
      {role_id: 1, permission_id: 5},
      {role_id: 1, permission_id: 6},
      {role_id: 1, permission_id: 7},
      {role_id: 1, permission_id: 8},
      {role_id: 1, permission_id: 9},
      {role_id: 1, permission_id: 10},
      {role_id: 1, permission_id: 11},
      {role_id: 1, permission_id: 12},
      {role_id: 1, permission_id: 13},
      {role_id: 1, permission_id: 14},
      {role_id: 1, permission_id: 15},
      {role_id: 1, permission_id: 16},
      {role_id: 1, permission_id: 17},
      {role_id: 1, permission_id: 18},
      {role_id: 1, permission_id: 19},
      {role_id: 1, permission_id: 20},
      {role_id: 1, permission_id: 21},
      {role_id: 1, permission_id: 22},
      {role_id: 1, permission_id: 23},
      {role_id: 1, permission_id: 24},
      {role_id: 1, permission_id: 25},
      {role_id: 1, permission_id: 26},
      {role_id: 1, permission_id: 27},
      {role_id: 1, permission_id: 28},
      {role_id: 1, permission_id: 29},
      {role_id: 1, permission_id: 30},
      {role_id: 1, permission_id: 31},
      {role_id: 1, permission_id: 32},
      {role_id: 1, permission_id: 33},
      {role_id: 1, permission_id: 34},
      {role_id: 1, permission_id: 35},
      {role_id: 1, permission_id: 36},
      {role_id: 1, permission_id: 37},
      {role_id: 1, permission_id: 38},
      {role_id: 1, permission_id: 39},
      {role_id: 1, permission_id: 40},
      {role_id: 1, permission_id: 41},
      {role_id: 1, permission_id: 42},
      {role_id: 1, permission_id: 43},
      {role_id: 1, permission_id: 44},
      {role_id: 1, permission_id: 45},
      {role_id: 1, permission_id: 46},
      {role_id: 1, permission_id: 47},
      {role_id: 1, permission_id: 48},
      {role_id: 1, permission_id: 49},
      {role_id: 1, permission_id: 50},
      {role_id: 1, permission_id: 51},
      {role_id: 1, permission_id: 52},
//COORDINATOR
      { role_id: 2, permission_id: 1 }, // GET Rubrics
      { role_id: 2, permission_id: 5 }, // GET Subjects
      { role_id: 2, permission_id: 9 }, // GET Evaluations
      { role_id: 2, permission_id: 13 }, // GET Activities
      { role_id: 2, permission_id: 17 }, // GET Indicators
      { role_id: 2, permission_id: 21 }, // GET OutcomesSubjects
      { role_id: 2, permission_id: 29 }, // GET StudentsOutcomes
      { role_id: 2, permission_id: 33 }, // GET IndicatorsRubrics
      { role_id: 2, permission_id: 37 }, // GET Users
      // Aqui vienen los permisos para /Rubrics
      { role_id: 2, permission_id: 2 }, // POST Rubrics
      { role_id: 2, permission_id: 3 }, // PUT Rubrics
      { role_id: 2, permission_id: 4 }, // DELETE Rubrics
      // Aqui vienen los permisos para /StudentsOutcomes
      { role_id: 2, permission_id: 30 }, // POST StudentsOutcomes
      { role_id: 2, permission_id: 31 }, // PUT StudentsOutcomes
      { role_id: 2, permission_id: 32 }, // DELETE StudentsOutcomes
      // Aqui vienen los permisos para /Indicators
      { role_id: 2, permission_id: 18 }, // POST Indicators
      { role_id: 2, permission_id: 19 }, // PUT Indicators
      { role_id: 2, permission_id: 20 }, // DELETE Indicators
      // Aqui vienen los permisos para /IndicatorsRubrics
      { role_id: 2, permission_id: 34 }, // POST IndicatorsRubrics
      { role_id: 2, permission_id: 35 }, // PUT IndicatorsRubrics
      { role_id: 2, permission_id: 36 }, // DELETE IndicatorsRubrics
      // Aqui vienen los permisos para /OutcomesSubjects
      { role_id: 2, permission_id: 22 }, // POST OutcomesSubjects
      { role_id: 2, permission_id: 23 }, // PUT OutcomesSubjects
      { role_id: 2, permission_id: 24 }, // DELETE OutcomesSubjects
//Leader
      { role_id: 3, permission_id: 1 },  // GET Rubrics
      { role_id: 3, permission_id: 5 },  // GET Subjects
      { role_id: 3, permission_id: 9 },  // GET Evaluations
      { role_id: 3, permission_id: 13 }, // GET Activities
      { role_id: 3, permission_id: 17 }, // GET Indicators
      { role_id: 3, permission_id: 19 }, // PUT Indicators
      { role_id: 3, permission_id: 21 }, // GET OutcomesSubjects
      { role_id: 3, permission_id: 25 }, // GET ProffesorsSubjects
      { role_id: 3, permission_id: 29 }, // GET StudentsOutcomes
      { role_id: 3, permission_id: 33 }, // GET IndicatorsRubrics
      { role_id: 3, permission_id: 37 },  // GET Users
//Proffesor
      { role_id: 4, permission_id: 1 },  // GET Rubrics
      { role_id: 4, permission_id: 5 },  // GET Subjects
      { role_id: 4, permission_id: 9 },  // GET Evaluations
      { role_id: 4, permission_id: 10 }, // POST Evaluations
      { role_id: 4, permission_id: 11 }, // PUT Evaluations
      { role_id: 4, permission_id: 12 }, // DELETE Evaluations
      { role_id: 4, permission_id: 13 }, // GET Activities
      { role_id: 4, permission_id: 14 }, // POST Activities
      { role_id: 4, permission_id: 15 }, // PUT Activities
      { role_id: 4, permission_id: 16 }, // DELETE Activities
      { role_id: 4, permission_id: 17 }, // GET Indicators
      { role_id: 4, permission_id: 21 }, // GET OutcomesSubjects
      { role_id: 4, permission_id: 29 }, // GET StudentsOutcomes
      { role_id: 4, permission_id: 33 }, // GET IndicatorsRubrics
    ])

    await User.createMany([
      {
        name: 'David Cardona Franco',
        email: 'david.cardonaf@autonoma.edu.co',
        password: 'hola123',
        role_id: 1,
        rememberMeToken: ''
      },
      {
        name: 'Coordinador Example',
        email: 'coordinatorexample@example.com',
        password: 'example',
        role_id: 2,
        rememberMeToken: ''
      },
      {
        name: 'Leader Example',
        email: 'leaderexample@example.com',
        password: 'example',
        role_id: 3,
        rememberMeToken: ''
      },
      {
        name: 'Proffesor Example',
        email: 'proffesorexample@example.com',
        password: 'example',
        role_id: 4,
        rememberMeToken: ''
      }
    ])
  }
}
