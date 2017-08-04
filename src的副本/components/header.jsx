import React from 'react'
import '../styles/header'
import MockData from '../utils/data'

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                this is a headerheaderheader
                <p>name:{MockData.name}</p>
                <p>age:{MockData.age}</p>
            </div>
        )
    }
}


export default Header;