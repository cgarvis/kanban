var React = require('react');

var AuthActionCreators = require('../actions/auth-action-creators.js');

var Login = React.createClass({

  getInitialState: function () {
    return {
      error: false
    };
  },

  authenticate: function (evt) {
    AuthActionCreators.loginWithGithub();
  },

  render: function () {
    return (
      <div id="authentication">
        <div className="oauth">
          <button className="btn btn-link" onClick={this.authenticate}>
            <i className="fa fa-github" />
          </button>
        </div>
      </div>
    );
  }
});

module.exports = Login;
