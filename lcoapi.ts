import { Application, Router } from "https://deno.land/x/oak/mod.ts";

//File: Model

interface Course{
  name: string,
  price: number,
  certification: boolean
}

//File: Data

let courses: Array<Course> =[
  {
    name: "C++ Begineers",
    price: 2.4,
    certification: true,

  },
  {
    name: "JavaScript Begineers",
    price: 3.4,
    certification: true,
  },
  {
    name: "iOS Begineers",
    price: 0,
    certification: false,
  },
];

//File: Controllers

export const getCourses = ({response} :{response: any}) => {
response.body = courses;
};

export const addCourses = async ({request, response} :{request:any,response: any}) => {
  const body = await request.body();
  const course: Course = body.value;

  courses.push(course);
  response.body = {coursesAdded : "Sucess"};
  response.status = 200;
  };

//File: Server

const router = new Router();
const app = new Application();
const PORT = 4300;


router 
.get("/learn", getCourses)
.post("/create", addCourses);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port:4300});