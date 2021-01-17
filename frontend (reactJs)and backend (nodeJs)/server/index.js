const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql');
const cors = require("cors");

const db = mysql.createPool({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12379028',
    password: 'GGbkWtWrPL',
    database: 'sql12379028',
    port: 3306,
    debug: false,
    multipleStatements: true

})
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ---------------------------------------------- Get ------------------------------------------//
//--------majors-------------//
app.get("/api/get", (req, res) => {
    const sqlget = 'SELECT * FROM sql12379028.major;'
    db.query(sqlget, (err, result) => {
        res.send(result);
        console.log(result)

    });
});


//--------all course inside a major-------------//
app.get(`/api/:tagId`, (req, res) => {

    const sqlgetCourse = `SELECT * FROM sql12379028.course where major_code="` + req.param("tagId") + '"'
    db.query(sqlgetCourse, (err, result) => {
        res.send(result);
    });
});
res = [];
//--------reviews-------------//
app.get(`/api/review/:tagId/:tagID2`, (req, res) => {

    const sqlgetReview = `SELECT * FROM sql12379028.verifid_review where major_code="` + req.param("tagId") + '"' + " and course_number= " + '"' + req.param("tagID2") + '"'
    db.query(sqlgetReview, (err, result) => {

        res.send(result);
    });
});
//--------course with specific number and major code-------------//
app.get(`/api/specialCo/:tagId/:tagID2`, (req, res) => {

    const sqlgetCourse = `SELECT * FROM sql12379028.course where major_code="` + req.param("tagId") + '"' + " and course_number= " + '"' + req.param("tagID2") + '"'
    db.query(sqlgetCourse, (err, result) => {
        res.send(result);
    });
});
//--------Pre-------------//
app.get(`/api/preq/:tagId/:tagID2`, (req, res) => {

    const sqlgetCourse = `SELECT * FROM sql12379028.CoursePreq where major_code="` + req.param("tagId") + '"' + " and course_number= " + '"' + req.param("tagID2") + '"'
    db.query(sqlgetCourse, (err, result) => {
        res.send(result);
    });
});
//--------crosslisted-------------//
app.get(`/api/cross/:tagId/:tagID2`, (req, res) => {

    const sqlgetCourse = `SELECT * FROM sql12379028.Crosslisted where major_code="` + req.param("tagId") + '"' + " and course_number= " + '"' + req.param("tagID2") + '"'
    db.query(sqlgetCourse, (err, result) => {
        res.send(result);
    });
});
//--------When offered-------------//
app.get(`/api/semester/:tagId/:tagID2`, (req, res) => {

    const sqlgetSeme = `SELECT * FROM sql12379028.courseSemester where major_code="` + req.param("tagId") + '"' + " and course_number= " + '"' + req.param("tagID2") + '"'
    db.query(sqlgetSeme, (err, result) => {
        res.send(result);
    });
});
//---------------getStudentName-------------//

app.get(`/api/student/:tagId`, (req, res) => {
    const sqlgetCourse = `SELECT * FROM sql12379028.Students where ID="` + req.param("tagId") + '"' + ';'
    db.query(sqlgetCourse, (err, result) => {
        res.send(result);
    });
});
//-----------------------Took courses---------------------------//
app.get(`/api/student/took/:tagId`, (req, res) => {
    //----------Took---------------------------//
    const sqlgetTookCourse = `select * 
    from sql12379028.Took_course t
    where t.ID="`+ req.param("tagId") + `"`
    db.query(sqlgetTookCourse, (err, result) => {

        // took = result;
        res.send(result);
    });
});

//-------------------------------------------AVailable course ---------------------------//
took = []
AllCourses = []
preq = []
available_Courses = []


app.get(`/api/student/preq/:tagId`, (req, res) => {
    //----------Took---------------------------//
    const sqlgetTookCourse = `select * 
    from sql12379028.Took_course t
    where t.ID="`+ req.param("tagId") + `"` + `and t.letter_grade<"D"`
    db.query(sqlgetTookCourse, (err, result) => {

        took = result;
        // res.send(took);
    });
    //------ALl courses a student can take------------//
    const sqlgetCourse = `SELECT c.course_name,c.major_code,c.course_number,c.credits_nom,cs.semester FROM sql12379028.course c
    left join sql12379028.courseSemester cs on cs.course_number=c.course_number and cs.major_code=c.major_code
     join sql12379028.StudentsMajor s
    on s.ID="`+ req.param("tagId") + `"` + `and s.major_code=c.major_code`
    db.query(sqlgetCourse, (err, result) => {

        AllCourses = result;
        // res.send(AllCourses);
        // console.log(AllCourses);
    });

    //----------AlL preq---------------------------//

    const sqlgetpreq = `SELECT * FROM sql12379028.CoursePreq q
    join sql12379028.StudentsMajor s
    on s.ID="`+ req.param("tagId") + `"` + ` and s.major_code=q.major_code`
    db.query(sqlgetpreq, (err, result) => {

        preq = result;
        // res.send(preq);

        var count = 0;
        var flagexist = false;
        var flagpreqTaken = true;
        var flag = false;

        for (var i = 0; i < AllCourses.length; i++) {
            for (var p = 0; p < preq.length; p++) {
                for (var t = 0; t < took.length; t++) {

                    if (AllCourses[i].course_number === took[t].course_number)
                        flagexist = true;

                    else if (AllCourses[i].course_number === preq[p].course_number && preq[p].Preq_course_number === took[t].course_number) {
                        flag = true;

                    }
                    else if (AllCourses[i].course_number != preq[p].course_number) {
                        flag = true;
                    }
                    else if (preq[p].concurrently == 1)
                        flag = true;

                }
                if (flag == false)
                    flagpreqTaken = false;
                flag = false;
            }
            if (flagexist == false && flagpreqTaken == true) {
                available_Courses[count] = AllCourses[i];
                count++;
            }
            flagexist = false;
            flagpreqTaken = true;


        }
        res.send(available_Courses);
    });

});


//----------preq---------------------------//
// app.get(`/api/student/preq/:tagId/:tagID2`, (req, res) => {
//     const sqlgetCo = `select   q.major_code,q.course_number,t.major_code as took_major_code,t.course_number as took_course_number
//     from sql12379028.CoursePreq q
//      join sql12379028.Took_course t2
//     on  not EXISTS (SELECT T3.course_number FROM sql12379028.Took_course as T3 WHERE T3.course_number=q.course_number) and t2.ID="`+ req.param("tagId") + `"` + `and q.major_code="` + req.param("tagID2") + `"` + `
//     left join  sql12379028.Took_course t
//     on t.major_code=q.Preq_major_code and t.course_number=q.Preq_course_number`

//     db.query(sqlgetCo, (err, result) => {

//         preq = result;
//         var s = 0;
//         var flag = true
//         // for (var p = 0; p < preq.length; p++)
//         //     for (var i = 0; i < took.length; i++) {
//         //         if (preq[p].)
//         // }

//         res.send(preq);
//     });
// });

// app.get('/p/:tagId', function (req, res) {
//     res.send("tagId is set to " + req.param("tagId"));
// });

//----------------------------------------------------POST------------------------------------------------------------------------//
app.post(`/api/insert/TakeCourse/`, (req, res) => {
    const ID = req.body.ID;
    const code = req.body.code;
    const number = req.body.number;
    const letter = req.body.letter;
    const year = req.body.year;
    const semester = req.body.semester;

    console.log(ID);
    console.log(code);
    console.log(number);
    console.log(year);
    console.log(semester);

    const insert = `insert into sql12379028.Took_course values (?,?,?,?, ?,?);`
    // const insert = `insert into sql12379028.Took_course values (900185052,"ACCT",3004,"A", 2001,"fall");`
    db.query(insert
        , [ID, code, number, letter, year, semester]
        , (err, result) => {

            // res.send(insert);
            // res.statusCode = 404;
            // res.setHeader('Content-Type', 'text/plain');
            // res.end('Cannot ' + req.method + ' ' + req.url);
            console.log(result)
        });
});

app.post(`/api/insert/review`, (req, res) => {
    const ID = req.body.ID;
    const code = req.body.code;
    const number = req.body.number;
    const rating = req.body.rating;
    const text_review = req.body.text_review;

    console.log(ID);
    console.log(code);
    console.log(number);
    console.log(rating);
    console.log(text_review);

    const insert = `insert into sql12379028.Review values (?,?,?, ?,?);`
    // const insert = `insert into sql12379028.Took_course values (900185052,"ACCT",3004,"A", 2001,"fall");`
    db.query(insert
        , [code, number, ID, rating, text_review]
        , (err, result) => {

            console.log(result)
        });
});
app.listen(4000)
