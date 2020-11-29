import React, { Component } from 'react';
import Course from './course';
export default class major extends Component {
    state = {
        appear: false,
        courseAppear: false,
    }
    Coursetoogle = () => {
        var ap = !this.state.courseAppear;
        this.setState({ courseAppear: ap })
    }

    toogle = () => {
        var ap = !this.state.appear;
        this.setState({ appear: ap })
    }
    render() {

        return (

            <div className="container">


                {this.props.courseIndex % 2 === 0 ?
                    <div className=" majorColor major " onClick={() => this.props.getinformation(this.props.code) + this.toogle()} >
                        <a >{this.props.name}
                        </a>
                    </div> :
                    <div className="major" onClick={() => this.props.getinformation(this.props.code) + this.toogle()}>
                        <a >{this.props.name}
                        </a>
                    </div>


                }
                <div className="container">{this.state.appear &&
                    this.props.coursedata.filter(coursedata => coursedata.major_code == this.props.code).map(course => {
                        return (
                            <div>
                                <Course
                                    code={course.major_code}
                                    number={course.course_number}
                                    name={course.course_name}
                                    cre={course.credits_nom}
                                    description={course.description}
                                    notes={course.notes}
                                    seeMore={this.props.seeMore}
                                    reviewtoggle={this.props.reviewtoggle}
                                    preq={this.props.preq}
                                    cross={this.props.cross}
                                    preq_cross={this.props.preq_cross}
                                    semesters={this.props.semesters}
                                    courseAppear={this.state.courseAppear}
                                    Coursetoogle={this.Coursetoogle}
                                    currname={this.props.currname}

                                />

                            </div>
                        )
                    }

                    )
                }</div>


            </div >

        )
    }

}