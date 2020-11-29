import React, { Component } from 'react';

export default class review extends Component {
    state = {
        login: false,
    }
    logintoogle = () => {
        var ap = !this.state.login;
        this.setState({ login: ap })
    }
    render() {

        return (

            <div className="container">
                <div className="container course">

                    <div className="card ">
                        <div className="card-header badge-info pointer" >
                            {this.props.code}/{this.props.number}&nbsp;&nbsp; {this.props.name}&nbsp;&nbsp;({this.props.cre}cr)
                    </div>
                        <div class="card-body">
                            {
                                this.props.preq.length != 0 &&
                                <div>
                                    <h3>preq</h3>
                                    <ul>
                                        {this.props.preq.map(p => { return <li>{p.Preq_major_code}/{p.Preq_course_number} &nbsp;&nbsp;{p.concurrently === 1 ? "(concurrently)" : ""}</li> })}
                                    </ul>
                                </div>

                            }
                            {
                                this.props.description != "N" &&
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
                            {
                                this.props.cross.length != 0 &&
                                <div>
                                    <h3>crosslisted</h3>
                                    <ul>
                                        {this.props.cross.map(c => { return <li>{c.cross_major_code}/{c.cross_course_number}</li> })}
                                    </ul>
                                </div>

                            }
                            {
                                this.props.semesters.length !== 0 &&
                                <div>
                                    <h3>when Offered</h3>
                                    <ul>
                                        {this.props.semesters.map(c => { return <li>{c.semester}</li> })}
                                    </ul>
                                </div>

                            }

                        </div>
                        <div class="card-footer text-muted">
                            <a className="pointer" onClick={() => this.props.seeMore(this.props.code, this.props.number)}>return back ...</a>
                        </div>
                    </div>
                </div >
                <div className="container">
                    {this.props.reviews.map(review => {
                        return (
                            <div className="cards">


                                {review.rating >= 3 ? <div class={"card text-white bg-success mb-3"} >
                                    <div class="card-header">
                                        <i class='fas fa-user-alt user'></i>
                                        &nbsp;&nbsp;

                                        user:{review.ID}
                                        <i className={review.verified == 1 ? "fa fa-check bg-success text-dark rounded font-weight-dark check button" : ""} ></i>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title" style={{ textDecoration: "underline" }}>Comments</h5>
                                        <p class="card-text">{review.Text_review}</p>
                                        <div className="leftdown">
                                            <span>Star Rating</span>:
                                    {review.rating >= 1 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                            {review.rating >= 2 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                            {review.rating >= 3 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                            {review.rating >= 4 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                            {review.rating >= 5 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                        </div>


                                    </div>
                                </div>
                                    :
                                    <div class={"card text-white bg-danger mb-3"} >

                                        <div class="card-header">
                                            <i class='fas fa-user-alt user'></i>
                                            &nbsp;&nbsp;

                                        user:{review.ID}
                                            <i className={review.verified == 1 ? "fa fa-check bg-success text-dark rounded font-weight-dark check button" : ""} ></i>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="card-title" style={{ textDecoration: "underline" }}>Comments</h5>
                                            <p class="card-text">{review.Text_review}</p>
                                            <div className="leftdown">
                                                <span>Star Rating</span>:
                                        {review.rating >= 1 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                                {review.rating >= 2 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                                {review.rating >= 3 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                                {review.rating >= 4 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                                {review.rating >= 5 ? <span class="fa fa-star checked"></span> : <span class="fa fa-star"></span>}
                                            </div>


                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br /> <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />





                    {!this.props.submitted && this.state.login &&
                        <div class="form-group">
                            <h2>please login first </h2>
                            <input type="text" onChange={(e) => this.props.handleText(e.target.value)} class="form-control" placeholder="answer this" />
                            < button className="bg-success rounded col-2  p-2" onClick={() => this.props.submitToggle() + this.props.Available_courses(this.props.id)}>submit</button>
                        </div>
                    }
                    {this.props.submitted && this.state.login &&
                        <div>

                            <label for="Review">rating</label>   &nbsp;&nbsp;
                            <small id="passwordHelpInline" class="text-muted">
                                Must be out of 5
                            </small>
                            <input type="number" max="5" min="1" onChange={(e) => this.props.Addrating(e.target.value)} class="form-control" placeholder="rating" />

                            <br />

                            <label for="Review">Example textarea</label>
                            <textarea type="text" onChange={(e) => this.props.AddrReview(e.target.value)} class="form-control" placeholder="write your review" />
                            < button className="bg-success rounded col-2  p-2" onClick={() => this.props.insertReview() + this.props.renderReview(this.props.code, this.props.number) + this.logintoogle()}>post</button>
                        </div>
                    }
                    < button className="bg-success rounded col-2  p-2 button" onClick={() => this.logintoogle()}>Write/close review</button>
                    <br />
                    <br />
                    <br />
                </div >
            </div >
        )
    }

}