'use strict';
var React = require('react');

// NOTE: This is using https://github.com/M6Web/react-modal/network
// But more activity on https://github.com/rackt/react-modal however that one is
// currently not server side rendering compatible
// TODO: Switch to working version from rackt when available
var ReactModal = require('react-modal');
var Button = require('react-bootstrap').Button;

var Modal = React.createClass({

    getInitialState: function () {
        return {
            mountModal: false,
            showModal: false
        }
    },
    
    componentDidMount: function () {
        var appElement = document.getElementById('modal');

        ReactModal.setAppElement(appElement);
        
        var state = this.state;
        state.mountModal = true;
        state.showModal = typeof this.props.message !== "undefined";
        return this.setState(state);
    },
    
    componentWillReceiveProps: function (nextProps) {
        var state = this.state;
        state.showModal = typeof nextProps.message !== "undefined";
        this.setState(state);
    },
    
    closeModal: function (e) {
        var state = this.state;
        state.showModal = false;
        this.setState(state);        
    },
    

    render: function() {
        if (this.state.mountModal) {
            return (
                <ReactModal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    closeTimeoutMS={0}>
                        <h1>Server Error!</h1>
                        <p>{this.props.message}</p>
                        <div className="modalButtonBar">
                            <Button 
                                bsStyle='success'
                                bsSize='large'
                                block
                                onClick={this.closeModal}>Ok</Button>
                        </div>
                </ReactModal>
            );          
        } else {
            return null;
        }
    }
});

module.exports = Modal;