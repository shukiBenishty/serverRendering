import React from 'react';
import Otp from './Otp.jsx';
import Sms from './Sms.jsx';
import  { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
        <Switch>
          <Route path="/otp" component={Otp}/>
          <Route path="/" component={Sms}/>
        </Switch>
    );
  };
};

const mapStateToProps = state =>
{
    return {
      urlParams: state.urlParams,
      phone: state.phone,
      personalId: state.personalId
    }
};


export default withRouter(connect(mapStateToProps)(App));
