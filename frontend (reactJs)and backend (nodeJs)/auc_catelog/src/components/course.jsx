import React, { Component } from 'react';

export default class course extends Component {
    state = {
        appear: false,

    }

    toogle = () => {
        var ap = !this.state.appear;
        this.setState({ appear: ap })
    }
    render() {

        return (
            <div>

                {/* {!this.state.appear &&
                    <div class="card-header badge-info m-2 pointer" onClick={() => this.props.seeMore(this.props.code, this.props.number)} >
                        {this.props.code}/{this.props.number} &nbsp; &nbsp; {this.props.name}&nbsp;&nbsp;({this.props.cre}cr)
                </div>} */}
                {!this.state.appear || this.props.name === this.props.currname ?
                    <div class="card-header badge-info m-2 pointer" onClick={() => this.props.preq_cross(this.props.code, this.props.number) + this.toogle()} >
                        {this.props.code}/{this.props.number} &nbsp; &nbsp; {this.props.name}&nbsp;&nbsp;({this.props.cre}cr)
                </div> :



                    <div className="container course">

                        <div class="card ">
                            <div class="card-header badge-info pointer" onClick={() => this.props.preq_cross(this.props.code, this.props.number) + this.toogle()}>
                                {this.props.code}/{this.props.number}&nbsp;&nbsp; {this.props.name}&nbsp;&nbsp;({this.props.cre}cr)
                          </div>
                            <div class="card-body">
                                {/* {
                                    this.props.preq.length != 0 &&
                                    <div>
                                        <h3>preq</h3>
                                        <ul>
                                            {this.props.preq.map(p => { return <li>{p.Preq_major_code}/{p.Preq_course_number}</li> })}
                                        </ul>
                                    </div>

                                } */}
                                {
                                    this.props.description !== " N" && this.props.description !== "N" &&
                                    < div >
                                        <h3 >description</h3>
                                        <p className="cours">{this.props.description}</p>
                                    </div>
                                }

                                {
                                    this.props.notes != "N" &&
                                    < div >
                                        <h3>Notes</h3>
                                        <p className="cours">{this.props.notes}</p>
                                    </div>
                                }
                                {/* {
                                    this.props.cross.length != 0 &&
                                    <div>
                                        <h3>crosslisted</h3>
                                        <ul>
                                            {this.props.cross.map(c => { return <li>{c.cross_major_code}/{c.cross_course_number}</li> })}
                                        </ul>
                                    </div>

                                } */}
                                {/* {
                                    this.props.semesters.length !== 0 &&
                                    <div>
                                        <h3>when Offered</h3>
                                        <ul>
                                            {this.props.semesters.map(c => { return <li>{c.semester}</li> })}
                                        </ul>
                                    </div>

                                } */}
                            </div>
                            <div class="card-footer text-muted">
                                <a className="pointer" onClick={() => this.props.seeMore(this.props.code, this.props.number)}>see more (preq, crosslisted,reviews ...)</a>
                            </div>
                        </div>
                    </div >

                }
                {this.props.reviewtoggle && <div></div>}
            </div >
        )
    }

}