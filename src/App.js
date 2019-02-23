import React, { Component } from 'react';
import './App.css';
import { API, Storage, Auth } from 'aws-amplify';
import CustomNavbar from './components/CustomNavbar'
import Routes from './Routes'
import { Container, Row, Col } from 'reactstrap'
import './css/layout.css'
import 'bootstrap/dist/css/bootstrap.css';
import Typography from 'typography'
import Contact from './components/Contact'
import { TypographyStyle, GoogleFont } from 'react-typography'
import Layout from './components/Layout'
import { withRouter } from 'react-router-dom'
import PageInfo from './components/pageInfo'

const typography = new Typography({
  baseFontSize: '14px',
  baseLineHeight: 1.3,
  headerFontFamily: ['Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: ['Helvetica Neue','Verdana', 'Helvetica', 'Arial','sans-serif'],
})

const sortByCreated = (arr) => {
  return arr.sort(function (a, b) {
    console.log(a)
    return b.createdAt-a.createdAt
  })
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated : false,
      pages: PageInfo.body,
      gimgs: [],
      isAuthenticating: true
    }
  }

  userHasAuthenticated = (authenticated) => {
  
    this.setState({ isAuthenticated : authenticated })

  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/");
  }

  getInfo = async () => {
    const { pages } = this.state;
    const request = await API.get("pages", "/pages").then(res=> {
      this.setState({ pages: res })
      return res;
    }).catch(err=>console.log(err.response))
  }


  async componentDidMount() {
  
    this.getInfo();
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
    }
  }

  this.setState({ isAuthenticating: false });

  
  }

  render() {

    const { pages } = this.state;
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      history: this.props.history,
    };
    console.log(pages.sort((a,b)=>  a.createdAt-b.createdAt))

    return (
     
      <Layout pages={pages} handleLogout={this.handleLogout} childProps={childProps}>
        <TypographyStyle typography = {typography} />
        <Routes childProps={{childProps, pages}}/>
      </Layout>
    );
  }
}

export default withRouter(App);
