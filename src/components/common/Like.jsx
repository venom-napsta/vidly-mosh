import React, { Component } from 'react'

export default class Like extends Component {
    render(props) {
        let {liked} = this.props
        let classes = "Like"
        if(liked) classes = classes + "d"
        return (
            <div>
                <button onClick={this.props.onClick} >{`${classes}`}</button>
            </div>
        )
    }
}
