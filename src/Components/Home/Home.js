import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { connect } from 'react-redux';

import './Home.css';

let ninjaOneData = {
    name: '',
    public_repos: 0,
    followers: 0,
    avatar_url: ''
};

let ninjaTwoData = {
    name: '',
    public_repos: 0,
    followers: 0,
    avatar_url: ''
};


class Example extends Component {
    constructor() {
        super();

        this.state = {
            ninjaOne: '',
            ninjaOneNameSuggestions: [],
            ninjaTwo: '',
            ninjaTwoNameSuggestions: [],
            users: [],
            value: '',
            ninjaOneDetails: [],
            ninjaTwoDetails: []
        };
    }

    onNinjaOneNameChange = (event, { newValue }) => {

        axios.get('https://api.github.com/search/users?q=' + newValue)
            .then((response) => {
                console.log(response.data);
                const persons = response.data.items;
                //console.log(persons);
                this.setState({
                    users: this.state.users.concat([...persons])
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            ninjaOne: newValue
        });
    };

    onNinjaTwoNameChange = (event, { newValue }) => {

        axios.get('https://api.github.com/search/users?q=' + newValue)
            .then((response) => {
                console.log(response.data);
                const persons = response.data.items;
                //console.log(persons);
                this.setState({
                    users: this.state.users.concat([...persons])
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            ninjaTwo: newValue
        });
    };

    onNinjaOneNameSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            ninjaOneNameSuggestions: this.getSuggestions(value)
        });
    };

    onNinjaTwoNameSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            ninjaTwoNameSuggestions: this.getSuggestions(value)
        });
    };

    onNinjaOneNameSuggestionsClearRequested = () => {
        this.setState({
            ninjaOneNameSuggestions: []
        });
    };

    onNinjaTwoNameSuggestionsClearRequested = () => {
        this.setState({
            ninjaTwoNameSuggestions: []
        });
    };


    escapeRegexCharacters = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions = (value) => {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        const regex = new RegExp('^' + escapedValue, 'i');

        return this.state.users.filter(user => regex.test(user.login));
    }

    getSuggestionNinjaOneName = (suggestion) => {
        return suggestion.login;
    }

    getSuggestionNinjaTwoName = (suggestion) => {
        return suggestion.login;
    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.login}
            </span>
        );
    }

    handleSubmit = (event) => {
        //alert('A name was submitted: ' + this.state.ninjaOne + ' ' + this.state.ninjaTwo);
        event.preventDefault();
        axios.all([
            axios.get('https://api.github.com/users/' + this.state.ninjaOne),
            axios.get('https://api.github.com/users/' + this.state.ninjaTwo)
        ])
            .then(axios.spread((ninjaOneRes, ninjaTwoRes) => {
                this.setState({
                    ninjaOneDetails: { name: ninjaOneRes.data.login, public_repos: ninjaOneRes.data.public_repos, followers: ninjaOneRes.data.followers, avatar_url: ninjaOneRes.data.avatar_url },
                    ninjaTwoDetails: { name: ninjaTwoRes.data.login, public_repos: ninjaTwoRes.data.public_repos, followers: ninjaTwoRes.data.followers, avatar_url: ninjaTwoRes.data.avatar_url }
                }, () => {
                    //ninja One details
                    ninjaOneData.name = this.state.ninjaOneDetails.name;
                    ninjaOneData.public_repos = this.state.ninjaOneDetails.public_repos;
                    ninjaOneData.followers = this.state.ninjaOneDetails.followers;
                    ninjaOneData.avatar_url = this.state.ninjaOneDetails.avatar_url;

                    //ninja Two details
                    ninjaTwoData.name = this.state.ninjaTwoDetails.name;
                    ninjaTwoData.public_repos = this.state.ninjaTwoDetails.public_repos;
                    ninjaTwoData.followers = this.state.ninjaTwoDetails.followers;
                    ninjaTwoData.avatar_url = this.state.ninjaTwoDetails.avatar_url;


                });
                console.log(this.state.ninjaOneDetails);
                console.log(this.state.ninjaTwoDetails);

                this.props.history.push("/result");
            })).catch((error) => {
                console.log(error);
            });
    }

    render() {
        const {
            ninjaOne,
            ninjaOneNameSuggestions,
            ninjaTwo,
            ninjaTwoNameSuggestions
        } = this.state;
        const ninjaOneNameInputProps = {
            placeholder: "Name",
            value: ninjaOne,
            onChange: this.onNinjaOneNameChange
        };
        const ninjaTwoNameInputProps = {
            placeholder: "Name",
            value: ninjaTwo,
            onChange: this.onNinjaTwoNameChange
        };
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">

                            <img src={require("../../assets/images/ninja1.png")} className="img-responsive" alt="Ninja One" height="150" width="150" className="ninjaImg" />
                            <p className="ninjaName">Ninja ONe</p>

                            <label htmlFor="inputEmail4">Enter github username</label>
                            <Autosuggest
                                className="form-control"
                                suggestions={ninjaOneNameSuggestions}
                                onSuggestionsFetchRequested={this.onNinjaOneNameSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onNinjaOneNameSuggestionsClearRequested}
                                //onSuggestionSelected={this.onninjaOneNameSuggestionselected}
                                getSuggestionValue={this.getSuggestionNinjaOneName}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={ninjaOneNameInputProps}
                                value={this.state.value}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <img src={require("../../assets/images/ninja2.png")} className="img-responsive" alt="Ninja Two" height="150" width="150" className="ninjaImg" />
                            <p className="ninjaName">Ninja Two</p>
                            <label htmlFor="inputEmail4">Enter github username</label>
                            <Autosuggest
                                className="form-control"
                                suggestions={ninjaTwoNameSuggestions}
                                onSuggestionsFetchRequested={this.onNinjaTwoNameSuggestionsFetchRequested}
                                onSuggestionsClearRequested={this.onNinjaTwoNameSuggestionsClearRequested}
                                //onSuggestionSelected={this.onninjaOneNameSuggestionselected}
                                getSuggestionValue={this.getSuggestionNinjaTwoName}
                                renderSuggestion={this.renderSuggestion}
                                inputProps={ninjaTwoNameInputProps}
                                value={this.state.value}
                            />
                        </div>
                    </div>

                    <div className="flexBoxAlign">
                        <button type="submit" className="startBtn" onClick={this.ninjaOneDis}>Start</button>
                    </div>

                </form>
            </React.Fragment>
        );
    }
}
const mapDispatchToProps = () => {
    return dispatch => {
        dispatch({ type: 'NINJA', payload: { one: ninjaOneData, two: ninjaTwoData, isAuthorized: 'true' } });
    }
};

export default connect(null, mapDispatchToProps)(Example);
