import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./NavBarDashStyles.css";

class Menu extends Component {
    render() {
        var visibility = "hide";

        if (this.props.menuVisibility) {
            visibility = "show";
        }

        return (
            <div id="flyoutMenu"
                className={visibility}>
                <div id="close"><img alt='close menu' src={require("../../images/close.svg")} onMouseDown={this.props.handleMouseDown} /></div>
                <div id="linkWrapper">
                    <div className="iconWrapper">
                        <img alt='home' src={require("../../images/home.svg")} className="icon" /><a href="/dashboard">Home</a>
                    </div>
                    <div className="iconWrapper">
                        <img alt='user' src={require("../../images/user.svg")} className="icon" /><a href="/account">Account</a>
                    </div>
                    <Link to='/' className="iconWrapper">
                        <img alt='logout' src={require("../../images/logout.svg")} className="icon" /><p>Logout</p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Menu;