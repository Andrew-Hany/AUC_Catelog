import React, { Component } from 'react';

export default class review extends Component {



    render() {

        return (

            <div className="container">
                <div className="container">
                    {!this.props.submitted &&
                        <div class="login"  >

                            <input type="text" onChange={(e) => this.props.handleText(e.target.value)} class="form-control" placeholder="ID" />


                            < button className="bg-success rounded col-2  p-2 button" style={{ bottom: "20px" }} onClick={() => this.props.Available_courses(this.props.id)}>submit</button>
                        </div>
                    }


                    {this.props.submitted &&
                        <div >

                            <h1 className="text-primary" style={{ textAlign: "center", marginTop: "10px" }}>Profile</h1>

                            <span>name:{this.props.name}</span>
                            <br />
                            <span>Gpa: {this.props.GPA}</span>

                            <h2>Adding course to your record</h2>
                            <input type="text" onChange={(e) => this.props.ADDcode(e.target.value)} class="form-control text" placeholder="Add course code" />
                            <input type="text" onChange={(e) => this.props.ADDnumber(e.target.value)} class="form-control text" placeholder="Add course number" />
                            <input type="text" onChange={(e) => this.props.ADDnLetter(e.target.value)} class="form-control text" placeholder="Add letter grade" />
                            <input type="text" onChange={(e) => this.props.ADDnYear(e.target.value)} class="form-control text" placeholder="Add year" />
                            <input type="text" onChange={(e) => this.props.ADDnsemester(e.target.value)} class="form-control text" placeholder="Add semester" />
                            < button className="bg-success rounded col-2  p-2 " style={{ position: "relative", left: "50%", }} onClick={() => this.props.Available_courses() + this.props.insert()}>ADD course</button>

                            <h1>Taken Courses</h1>
                            <table>
                                <tr>
                                    <th>CODE</th>
                                    <th>Letter Grade</th>
                                    <th>semester</th>
                                    <th>year</th>


                                </tr>

                                {this.props.tookCourse.map(courses => {
                                    return (
                                        <tr>

                                            <td>{courses.major_code}/{courses.course_number}</td>
                                            <td>{courses.letter_grade}</td>
                                            <td>{courses.semester}</td>
                                            <td>{courses.year}</td>



                                        </tr>
                                    )
                                })}

                            </table>
                            <h1>Available Courses</h1>
                            <h1>fall</h1>
                            <table>

                                <tr>
                                    <th>CODE</th>
                                    <th>name</th>
                                    <th>credits</th>
                                    <th>semester</th>
                                </tr>

                                {this.props.AvailableCourses.filter(c => c.semester == "fall").map(courses => {
                                    return (
                                        <tr>
                                            <td>{courses.major_code}/{courses.course_number}</td>
                                            <td>{courses.course_name}</td>
                                            <td>({courses.credits_nom}cr)</td>
                                            <td>{courses.semester}</td>

                                        </tr>
                                    )

                                })}
                            </table>

                            <h1>Spring</h1>
                            <table>
                                <tr>
                                    <th>CODE</th>
                                    <th>name</th>
                                    <th>credits</th>
                                    <th>semester</th>
                                </tr>
                                {this.props.AvailableCourses.filter(c => c.semester == "spring").map(courses => {
                                    return (
                                        <tr>
                                            <td>{courses.major_code}/{courses.course_number}</td>
                                            <td>{courses.course_name}</td><td>({courses.credits_nom}cr)</td>
                                            <td>{courses.semester}</td>


                                        </tr>
                                    )
                                })}
                            </table>
                            <h1>summer</h1>

                            <table>
                                <tr>
                                    <th>CODE</th>
                                    <th>name</th>
                                    <th>credits</th>
                                    <th>semester</th>
                                </tr>
                                {this.props.AvailableCourses.filter(c => c.semester == "summer").map(courses => {
                                    return (
                                        <tr>
                                            <td>{courses.major_code}/{courses.course_number}</td>
                                            <td>{courses.course_name}</td><td>({courses.credits_nom}cr)</td>
                                            <td>{courses.semester}</td>


                                        </tr>
                                    )
                                })}
                            </table>

                            <h1>winter</h1>
                            <table>
                                <tr>
                                    <th>CODE</th>
                                    <th>name</th>
                                    <th>credits</th>
                                    <th>semester</th>
                                </tr>
                                {this.props.AvailableCourses.filter(c => c.semester == "winter").map(courses => {
                                    return (
                                        <tr>
                                            <td>{courses.major_code}/{courses.course_number}</td>
                                            <td>{courses.course_name}</td><td>({courses.credits_nom}cr)</td>
                                            <td>{courses.semester}</td>


                                        </tr>
                                    )
                                })}
                            </table>

                            <h1>NOT specified</h1>
                            <table>
                                <tr>
                                    <th>CODE</th>
                                    <th>name</th>
                                    <th>credits</th>
                                    <th>semester</th>
                                </tr>
                                {this.props.AvailableCourses.filter(c => c.semester != "winter" & c.semester != "summer" & c.semester != "spring" & c.semester != "fall").map(courses => {
                                    return (
                                        <tr>
                                            <td>{courses.major_code}/{courses.course_number}</td>
                                            <td>{courses.course_name}</td><td>({courses.credits_nom}cr)</td>
                                            <td>NOT specified</td>


                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    }


                </div >
            </div >
        )
    }

}