/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

//ARREGLADO
Route.get("/Rubrics","RubricsController.index");
Route.post("/Rubrics","RubricsController.store");
Route.get("/Rubrics/:id","RubricsController.show");
Route.put("/Rubrics/:id","RubricsController.update");
Route.delete("/Rubrics/:id","RubricsController.destroy");

//ARREGLADO
Route.get("/Subjects","SubjectsController.index");
Route.post("/Subjects","SubjectsController.store");
Route.get("/Subjects/:code","SubjectsController.show");
Route.put("/Subjects/:code","SubjectsController.update");
Route.delete("/Subjects/:code","SubjectsController.destroy");

//ARREGLADO
Route.get("/Leaders","LeadersController.index");
Route.post("/Leaders","LeadersController.store");
Route.get("/Leaders/:id","LeadersController.show");
Route.put("/Leaders/:id","LeadersController.update");
Route.delete("/Leaders/:id","LeadersController.destroy");

//ARREGLADO
Route.get("/Proffesors","ProffesorsController.index");
Route.post("/Proffesors","ProffesorsController.store");
Route.get("/Proffesors/:id","ProffesorsController.show");
Route.put("/Proffesors/:id","ProffesorsController.update");
Route.delete("/Proffesors/:id","ProffesorsController.destroy");


//ARREGLADO
Route.get("/Evaluations","EvaluationsController.index");
Route.post("/Evaluations","EvaluationsController.store");
Route.get("/Evaluations/:id","EvaluationsController.show");
Route.put("/Evaluations/:id","EvaluationsController.update");
Route.delete("/Evaluations/:id","EvaluationsController.destroy");

/*
Route.get("/Activities","ActivitiesController.index");
Route.post("/Activities","ActivitiesController.store");
Route.get("/Activities/:id","ActivitiesController.show");
Route.put("/Activities/:id","ActivitiesController.update");
Route.delete("/Activities/:id","ActivitiesController.destroy");
*/
Route.resource('Activities', 'ActivitiesController').apiOnly();


Route.get("/Indicators","IndicatorsController.index");
Route.post("/Indicators","IndicatorsController.store");
Route.get("/Indicators/:id","IndicatorsController.show");
Route.put("/Indicators/:id","IndicatorsController.update");
Route.delete("/Indicators/:id","IndicatorsController.destroy");

Route.get("/OutcomesSubjects","OutcomesSubjectsController.index");
Route.post("/OutcomesSubjects","OutcomesSubjectsController.store");
Route.get("/OutcomesSubjects/:id","OutcomesSubjectsController.show");
Route.put("/OutcomesSubjects/:id","OutcomesSubjectsController.update");
Route.delete("/OutcomesSubjects/:id","OutcomesSubjectsController.destroy");

Route.get("/ProffesorsSubjects","ProffesorsSubjectsController.index");
Route.post("/ProffesorsSubjects","ProffesorsSubjectsController.store");
Route.get("/ProffesorsSubjects/:id","ProffesorsSubjectsController.show");
Route.put("/ProffesorsSubjects/:id","ProffesorsSubjectsController.update");
Route.delete("/ProffesorsSubjects/:id","ProffesorsSubjectsController.destroy");

Route.get("/StudentsOutcomes","StudentsOutcomesController.index");
Route.post("/StudentsOutcomes","StudentsOutcomesController.store");
Route.get("/StudentsOutcomes/:id","StudentsOutcomesController.show");
Route.put("/StudentsOutcomes/:id","StudentsOutcomesController.update");
Route.delete("/StudentsOutcomes/:id","StudentsOutcomesController.destroy");

Route.get("/IndicatorsRubrics","IndicatorsRubricsController.index");
Route.post("/IndicatorsRubrics","IndicatorsRubricsController.store");
Route.get("/IndicatorsRubrics/:id","IndicatorsRubricsController.show");
Route.put("/IndicatorsRubrics/:id","IndicatorsRubricsController.update");
Route.delete("/IndicatorsRubrics/:id","IndicatorsRubricsController.destroy");
