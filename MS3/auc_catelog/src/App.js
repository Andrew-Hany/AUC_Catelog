
import React, { Component } from 'react';
import './App.css';
import Axios from "axios";
import Major from './components/major';
import Nav from './components/navbar';
import Rev from './components/review';
import PRo from './components/profile';
class App extends Component {
  state = {
    courses: [],
    coursedata: [],
    specialized: [],
    reviews: [],
    preq: [],
    cross: [],
    semesters: [],
    student: [],
    AvailableCourses: [],
    tookCourse: [],
    hometoggle: true,
    reviewtoggle: false,
    myCourses: false,
    id: 0,
    name: "",
    GPA: 0.0,

    submitted: false,

    Code: "",
    number: 0,
    letter_grade: "",
    year: 0,
    semester: "",

    rating: -1,
    text_review: "",


  };

  ADDcode = (e) => {
    this.setState({ Code: e })
    console.log(this.state.Code);
  }
  ADDnumber = (e) => {
    this.setState({ number: e })
    console.log(this.state.Code);
  }
  ADDnLetter = (e) => {
    this.setState({ letter_grade: e })
  }
  ADDnYear = (e) => {
    this.setState({ year: e })
  }
  ADDnsemester = (e) => {
    this.setState({ semester: e })
  }
  handleText = (e) => {


    this.setState({ id: e })


    // console.log(this.state.id);
  }
  toggleonHome = () => {
    this.setState({
      hometoggle: true,
      reviewtoggle: false,
      myCourses: false,

    })
  }
  toggleonMy_courses = () => {
    this.setState({
      hometoggle: false,
      reviewtoggle: false,
      myCourses: true,

    })
  }


  componentDidMount() {

    Axios.get('https://auc-catelog-backend.glitch.me/api/get').then((response) => {
      this.setState({ courses: response.data })
      // this.state.courses = response.data
      console.log(this.state.courses)



    })


  }

  getinformation = (code) => {

    Axios.get('https://auc-catelog-backend.glitch.me/api/' + code).then((response) => {
      this.setState({ coursedata: response.data })
      console.log(this.state.coursedata)
    })
  }

  renderReview = (code, num) => {
    Axios.get('https://auc-catelog-backend.glitch.me/api/review/' + code + "/" + num).then((response) => {
      if (response.data)
        this.setState({ reviews: response.data })

    })
  }

  seeMore = (code, num) => {
    var toggle = !this.state.reviewtoggle;
    Axios.get('https://auc-catelog-backend.glitch.me/api/review/' + code + "/" + num).then((response) => {
      if (response.data)
        this.setState({ reviews: response.data })

      this.setState({ reviewtoggle: toggle })
    })

    Axios.get('https://auc-catelog-backend.glitch.me/api/specialCo/' + code + "/" + num).then((response) => {
      this.setState({ coursedata: response.data, reviewtoggle: toggle })
      console.log(this.state.coursedata.course_number)
    })
    Axios.get('https://auc-catelog-backend.glitch.me/api/preq/' + code + "/" + num).then((response) => {
      this.setState({ preq: response.data })
      // console.log(this.state.coursedata[0].course_number)
    })
    Axios.get('https://auc-catelog-backend.glitch.me/api/cross/' + code + "/" + num).then((response) => {
      this.setState({ cross: response.data })
      // console.log(this.state.coursedata[0].course_number)
    })
    Axios.get('https://auc-catelog-backend.glitch.me/api/semester/' + code + "/" + num).then((response) => {
      this.setState({ semesters: response.data })
      // console.log(this.state.coursedata[0].course_number)
    })
  }

  preq_cross = (code, num) => {
    Axios.get('https://auc-catelog-backend.glitch.me/api/specialCo/' + code + "/" + num).then((response) => {
      this.setState({ specialized: response.data })
      console.log(this.state.specialized[0].course_name)
    })


    Axios.get('https://auc-catelog-backend.glitch.me/api/preq/' + code + "/" + num).then((response) => {
      this.setState({ preq: response.data })
      console.log(this.state.coursedata[0].course_number)
    })
    Axios.get('https://auc-catelog-backend.glitch.me/api/cross/' + code + "/" + num).then((response) => {
      this.setState({ cross: response.data })
      // console.log(this.state.coursedata[0].course_number)
    })
    Axios.get('https://auc-catelog-backend.glitch.me/api/semester/' + code + "/" + num).then((response) => {
      this.setState({ semesters: response.data })
      // console.log(this.state.coursedata[0].course_number)
    })
  }
  submitToggle = () => {
    this.setState({ submitted: true });
  }

  Available_courses = () => {

    var id = this.state.id

    Axios.get('https://auc-catelog-backend.glitch.me/api/student/' + id).then((response) => {
      try {

        this.setState({ student: response.data })
        this.setState({ GPA: this.state.student[0].GPA })
        this.setState({ name: this.state.student[0].st_name })
        // console.log(this.state.student[0].GPA)
        Axios.get('https://auc-catelog-backend.glitch.me/api/student/took/' + id).then((response) => {
          // if (response.data) {
          this.setState({ tookCourse: response.data })
          // }
          // console.log(this.state.tookCourse)
        })

        Axios.get('https://auc-catelog-backend.glitch.me/api/student/preq/' + id).then((response) => {
          // if (response.data)
          this.setState({ AvailableCourses: response.data });

          console.log(this.state.AvailableCourses)
        })
        this.setState({ submitted: true });
      }

      catch{
        this.setState({ submitted: false })
        console.log(this.state.submitted)
        alert("wrong ID")
        console.log(this.state.submitted)

      }
    })
  }
  insert = () => {


    // {
    Axios.post('https://auc-catelog-backend.glitch.me/api/insert/TakeCourse',
      {
        ID: this.state.id,
        code: this.state.Code,
        number: this.state.number,
        letter: this.state.letter_grade,
        year: this.state.year,
        semester: this.state.semester,
      }).then(() => {

        // this.setState({ courses: response.data })
        // this.state.courses = response.data
        console.log("Asdasd")
        alert("Asdasd")


      })

    // }
  }


  Addrating = (e) => {
    if (e > 5)
      e = 5;
    this.setState({ rating: e })
  }
  AddrReview = (e) => {
    this.setState({ text_review: e })
  }


  insertReview = () => {

    Axios.post('https://auc-catelog-backend.glitch.me/api/insert/review',
      {
        ID: this.state.id,
        code: this.state.specialized[0].major_code,
        number: this.state.specialized[0].course_number,
        rating: this.state.rating,
        text_review: this.state.text_review,

      }).then(() => {
        console.log("Asdasd")
        alert("Asdasd")


      })


  }
  render() {



    return (

      <div  >

        <Nav
          toggleonHome={this.toggleonHome}
          toggleonMy_courses={this.toggleonMy_courses}

        />




        {this.state.myCourses &&
          < PRo
            ADDcode={this.ADDcode}
            ADDnumber={this.ADDnumber}
            ADDnLetter={this.ADDnLetter}
            ADDnYear={this.ADDnYear}
            ADDnsemester={this.ADDnsemester}
            handleText={this.handleText}
            Available_courses={this.Available_courses}
            id={this.state.id}
            GPA={this.state.GPA}
            name={this.state.name}
            tookCourse={this.state.tookCourse}
            AvailableCourses={this.state.AvailableCourses}
            submitted={this.state.submitted}
            insert={this.insert}

          />
        }
        {this.state.reviewtoggle &&
          <div >
            <Rev
              code={this.state.coursedata[0].major_code}
              number={this.state.coursedata[0].course_number}
              name={this.state.coursedata[0].course_name}
              cre={this.state.coursedata[0].credits_nom}
              description={this.state.coursedata[0].description}
              notes={this.state.coursedata[0].notes}
              seeMore={this.seeMore}
              reviews={this.state.reviews}
              preq={this.state.preq}
              cross={this.state.cross}
              semesters={this.state.semesters}
              getstudent={this.getstudent}
              id={this.state.id}
              student={this.state.student}
              submitted={this.state.submitted}
              submitToggle={this.submitToggle}
              insertReview={this.insertReview}
              Addrating={this.Addrating}
              AddrReview={this.AddrReview}
              handleText={this.handleText}
              Available_courses={this.Available_courses}
              renderReview={this.renderReview}
            />
          </div>
        }

        {this.state.hometoggle && !this.state.reviewtoggle &&
          <div className="cs">
            {this.state.courses.map(course => {
              return (<Major
                course={course}
                number={course.course_number}
                courseIndex={this.state.courses.indexOf(course)}
                name={course.major_name}
                currname={this.state.specialized.course_name}
                code={course.major_code}

                getinformation={this.getinformation}
                coursedata={this.state.coursedata}
                seeMore={this.seeMore}
                preq_cross={this.preq_cross}
                reviewtoggle={this.state.reviewtoggle}
                preq={this.state.preq}
                cross={this.state.cross}
                semesters={this.state.semesters}
              />)
            }

            )}
          </div>
        }
      </div>
    );
  }
}
export default App;
