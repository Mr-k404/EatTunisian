import React, { Component } from 'react'
import { Link ,withRouter, Redirect  } from 'react-router-dom'
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: "",
      isLoading: false,
      redirect: false,
      errMsgEmail: "",
      errMsgPwd: "",
      errMsg: "",
    };
  }

    onChangehandler = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      let data = {};
      data[name] = value;
      this.setState(data);
    };

onSignInHandler = () => {
    this.setState({ isLoading: true });
    axios
      .post("http://localhost:8000/api/user-login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((response) => {

        this.setState({ isLoading: false });
        if (response.data.status === 200) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userData", JSON.stringify(response.data.data));
          this.setState({
            msg: response.data.message,
            redirect: true,
          }); 

        }
        if (
          response.data.status === "failed" &&
          response.data.success === undefined
        ) {
          this.setState({
            errMsgEmail: response.data.validation_error.email,
            errMsgPwd: response.data.validation_error.password,
          });
          setTimeout(() => {
            this.setState({ errMsgEmail: "", errMsgPwd: "" });
          }, 2000);
        } else if (
          response.data.status === "failed" &&
          response.data.success === false
        ) {
          this.setState({
            errMsg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ errMsg: "" });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



    render() {
      //let history = useHistory();

       if (this.state.redirect) {
        
         return  <Redirect
         to={{
         pathname: "/dashboard",
         state: { property_id: true }
       }}
     />
       }
    // //   const login = localStorage.getItem("isLoggedIn");
    // // if (login) {
    // //   return <Redirect to="/dashboard" push={true} />;
    // // }
    const isLoading = this.state.isLoading;
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"
                       placeholder="Enter email" 
                       autoComplete="username" 
                       name="email"
                       value={this.state.email}
                       onChange={this.onChangehandler}
                       />
                       <span className="text-danger">{this.state.msg}</span>
                       <span className="text-danger">{this.state.errMsgEmail}</span>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password"
                       placeholder="Password"
                       name="password"
                       value={this.state.password}
                       onChange={this.onChangehandler} />
                       <span className="text-danger">{this.state.errMsgPwd}</span>
                    </CInputGroup>
                    <p className="text-danger">{this.state.errMsg}</p>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary"
                         className="px-4"
                         onClick={this.onSignInHandler}>
                      
                        {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5 "
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              
              <span>Login</span>
              
            )}
            </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
  }
  }

