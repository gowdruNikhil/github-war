import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import './Result.css';


class Result extends Component {
    state = {
        ninjaOne: { ...this.props.ninajState.one },
        ninjaTwo: { ...this.props.ninajState.two },
        value: this.props.ninajState.isAuthorized
    }
    render() {
        const { ninjaOne, ninjaTwo, value } = this.state;

        if (value) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <span className={ninjaOne.followers > ninjaTwo.followers ? 'winnerBanner' : 'looserBanner'} >winner</span>
                            <div className={ninjaOne.followers > ninjaTwo.followers ? 'looserStyle winnerStyle' : 'looserStyle'}>
                                <img
                                    src={ninjaOne.avatar_url}
                                    alt="Ninja One" className="imageStyle" />
                                <div>
                                    <h3>{ninjaOne.name}</h3>
                                    <p>Total Stars: {ninjaOne.totalStars}</p>
                                    <p>Followers: {ninjaOne.followers}</p>
                                    <p>No. of repos: {ninjaOne.public_repos}</p>
                                    <a href={"https://github.com/" + ninjaOne.name} target="_blank" rel="noopener noreferrer"
                                        className={ninjaOne.followers > ninjaTwo.followers ? '' : 'viewProfileNo'}
                                    >
                                        <button className="viewProfileBtn">View Profile</button>
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div className="col-6">
                            <span className={ninjaTwo.followers > ninjaOne.followers ? 'winnerBanner' : 'looserBanner'}>winner</span>
                            <div className={ninjaTwo.followers > ninjaOne.followers ? 'looserStyle winnerStyle' : 'looserStyle'}>
                                <img
                                    src={ninjaTwo.avatar_url}
                                    alt="Ninja One" className="imageStyle" />
                                <div>
                                    <h3>{ninjaTwo.name}</h3>
                                    <p>Total Stars: {ninjaTwo.totalStars}</p>
                                    <p>Followers: {ninjaTwo.followers}</p>
                                    <p>No. of repos: {ninjaTwo.public_repos}</p>
                                    <a href={"https://github.com/" + ninjaTwo.name} target="_blank" rel="noopener noreferrer"
                                        className={ninjaTwo.followers > ninjaOne.followers ? '' : 'viewProfileNO'}
                                    >
                                        <button className="viewProfileBtn">View Profile</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flexBoxAlign">
                            <Link to="/">
                                <button className="startAgainBtn"> Start Again</button>
                            </Link>
                        </div>


                    </div>
                </div >
            );
        }
        else {
            return <Redirect to='/' />;
        }
    }
}

const mapStateToProps = state => {
    return {
        ninajState: state.ninjaData
    };
}

export default connect(mapStateToProps)(Result);