import React, {Component} from 'react';
import 'whatwg-fetch';
import utility from '../utils/Utils.js';
import {postman} from '../utils/postMan.js';
var _this
class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            dob: ""
        }
        _this=this;
    }
    handleUpdate(type, event){
        if(type=="name"){
            this.setState({
                username:event.target.value
            });
        }
    }
    componentDidMount(){
        $('#datepicker').datepicker({
            onSelect: function(d,i){
                _this.setState({
                    dob:d
                })
            }
        });
    }

    login() {
        console.log(this.props.location);
        if(this.state.username && this.state.dob){
            fetch('https://swapi.co/api/people/?search='+this.state.username)
                .then(function (response) {
                    response.json().then(function (resp) {
                        if(resp && resp.results.length>0){
                            utility.util.setAuthInfo(resp.results);
                            postman.publish("LoggedIn")
                        }else{
                            alert("Sorry, User not found")
                        }
                    });
                });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <form><div className="col-md-4 col-md-offset-4">
                        <div className="row bgMain">
                            <div className="col-md-12">
                                <h2>Welcome Login here</h2>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label for="usr">Name:</label>
                                    <input type="text" className="form-control" id="usr" onChange={this.handleUpdate.bind(this,"name")} autocomplete="off" required/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label for="pwd">DOB:</label>
                                    <input type="text" id="datepicker"  placeholder="MM/DD/YYYY"
                                           className="form-control" required/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <input type="button" className="btn btn-primary" onClick={this.login.bind(this)} value="Submit"/>
                            </div>
                        </div>
                    </div></form>
                </div>
            </div>
        );
    }
}
export default Login;
