import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLabel,
  CRow,
  CAlert,
  CImg,
} from "@coreui/react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Creat = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [showElements, setShowElements] = useState(true);
  const [fileName, setFileName] = useState(props.location.dataToUpdat.img);
  const [Uplodeimage, setImage] = useState(props.location.dataToUpdat.img);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [valideName, setvalidName] = useState(null);
  const [valideFile, setvalidFile] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isCreated, setCreated] = useState();
  const [OldName, setOldName] = useState();
  const [OldFile, setOldFile] = useState();
  const [Uplodename, setName] = useState(props.location.dataToUpdat.name);
  const redirect = () => {
    return <Redirect to="/ingredient/show" />;
  };

  const alert = () => {
    return (
      <div className="mt-3 ml-2 mr-2">
        <CAlert color="primary" closeButton fade={true} show={5}>
          {isCreated}
        </CAlert>
      </div>
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    fileUpload();
    fields["name"] = "";
    console.log("uplimage" + Uplodeimage);
    console.log(props.location.dataToUpdat.img);
  };
  const onChangeFile = (field, e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (e.target.value) {
      setImage(e.target.value);
    } else {
      setImage(fileName);
    }
    let formIsValid = true;

    if (!Uplodeimage.length) return;
    //console.log(Uplodeimage);
    createImage(files[0]);
    setFileName(e.target.value);

    if (!Uplodeimage) {
      formIsValid = false;
      errors["file"] = "The file fild cannot be empty";
    }
    if (formIsValid) {
      setvalidFile("valid");
    } else {
      setvalidFile("invalid");
    }
  };

  const onChangeNamme = (field, e) => {
    if (e.target.value) {
      setName(e.target.value);
    }

    let formIsValid = true;
    if (typeof Uplodename !== "undefined") {
      if (!Uplodename.match("^[ A-Za-z]+$")) {
        formIsValid = false;
        errors["name"] = "The name should contain Only letters";
      } else {
        errors["name"] = "";
      }
    }
    if (formIsValid) {
      setvalidName("valid");
    } else {
      setvalidName("invalid");
    }
  };
  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setOldName(props.location.dataToUpdat.name);
    setOldFile(props.location.dataToUpdat.img);
  });

  const fileUpload = () => {
    setisLoading(true);
    axios
      .post("http://localhost:8000/api/ingredient/update", {
        id: props.location.dataToUpdat.id,
        name: Uplodename,
        file: Uplodeimage,
        oldimg: props.location.dataToUpdat.img,
      })
      .then((response) => {
        setisLoading(false);
        setName("");
        setFileName("Upload File");
        setvalidName(null);
        setvalidFile(null);
        setCreated(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isCreated ? redirect() : null}

      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              {isCreated ? alert() : null}
              <CCardHeader>Update Ingredient</CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CForm
                    onSubmit={(e) => onFormSubmit(e)}
                    className="form-horizontal"
                  >
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Ingredient Name</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>Old Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            placeholder={OldName}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="custom-file-input">
                        Ingredient Image
                      </CLabel>
                      <CCol xs="12">
                        <CInputFile
                          valid={valideFile == "valid" ? true : false}
                          invalid={valideFile == "invalid" ? true : false}
                          custom
                          size="16"
                          name="file"
                          onChange={(e) => onChangeFile("file", e)}
                          id="custom-file-input"
                          accept=".jpg,.png,.jpeg"
                        />
                        <CLabel
                          htmlFor="custom-file-input"
                          variant="custom-file"
                        >
                          {fileName}
                        </CLabel>
                      </CCol>
                      <span className="errorTxt">{errors["file"]}</span>
                    </CFormGroup>

                    <div className="form-actions">
                      <CButton
                        type="submit"
                        color="primary"
                        disabled={
                          valideName == "valid" || Uplodename == OldName
                            ? false
                            : valideName == null
                            ? true
                            : true
                        }
                      >
                        {isLoading ? (
                          <span
                            className="spinner-border spinner-border-sm ml-5 "
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span> Save changes </span>
                        )}
                      </CButton>
                      <CButton className="canceli" color="secondary">
                        Cancel
                      </CButton>
                    </div>
                    <CImg
                      src={
                        "http://localhost:8000/images/" +
                        props.location.dataToUpdat.img
                      }
                      fluid
                      className="updShow mb-2"
                    />
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default Creat;
