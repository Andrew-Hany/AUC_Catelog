import React, { Component } from 'react';
import Im from './logo.png'
export default class navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light bg-light border-bottom" style={{ fontSize: '15px' }}>

                    <div  >
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto" style={{ height: '50px' }}>
                                <img src={Im} style={{ width: '60px', height: '57px' }} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <li className="nav-item active">
                                    <a className="nav-link" style={{ fontWeight: 'bold' }}>AUC Catelog<span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" role="button" onClick={this.props.toggleonHome}>HOME</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" role="button" onClick={this.props.toggleonMy_courses}>Mycourses</a>
                                </li>


                                <form className="form-inline my-2 my-lg-0" style={{ visibility: ' hidden ' }}>
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </ul>
                            <div style={{ position: 'absolute', right: '30px', top: '10px', margin: '0px' }}>    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;




                {this.props.auth && <a className="navbar-brand" style={{ fontSize: '10px', margin: '0px' }}>{this.props.name}</a>}
                                &nbsp;&nbsp;&nbsp;
                  {/* {this.props.auth && <img src={this.props.picture} style={{ width: '30px', margin: '0px' }} />} */}

                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        );
    }
}