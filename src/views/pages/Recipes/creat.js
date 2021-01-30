import React from "react";
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
} from "@coreui/react";
import axios from "axios";

const Creat = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [fileName, setFileName] = React.useState("Upload File");
  const [Uplodeimage, setImage] = React.useState();
  const [Uplodename, setName] = React.useState();
  const [fields, setFields] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [valideName, setvalidName] = React.useState(null);
  const [valideFile, setvalidFile] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);
  const [isCreated, setCreated] = React.useState();

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
    fileUpload(Uplodeimage);
    fields["name"] = "";
  };

  const onChangeFile = (field, e) => {
    let files = e.target.files || e.dataTransfer.files;
    let formIsValid = true;
    if (!files.length) return;
    //console.log(Uplodeimage);
    createImage(files[0]);
    setFileName(e.target.files[0].name);
    let fieldlist = fields;
    fieldlist[field] = e.target.value;
    setFields(fieldlist);

    if (!fieldlist["file"]) {
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
    setName(e.target.value);
    let fieldlist = fields;
    let formIsValid = true;
    fieldlist[field] = e.target.value;
    setFields(fieldlist);

    if (!fieldlist["name"]) {
      formIsValid = false;
      errors["name"] = "The name filed cannot be empty";
    } else {
      errors["name"] = "";
    }

    if (typeof fieldlist["name"] !== "undefined") {
      if (!fieldlist["name"].match("^[ A-Za-z]+$")) {
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

  const fileUpload = (image) => {
    setisLoading(true);
    axios
      .post("http://localhost:8000/api/ingredient/creat", {
        name: Uplodename,
        file: Uplodeimage,
      })
      .then((response) => {
        setisLoading(false);
        setName("");
        setFileName("Upload File");
        setvalidName(null);
        setvalidFile(null);
        setCreated(response.data.message);
        console.log(response);
        console.log(isCreated);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              {isCreated ? alert() : null}
              <CCardHeader>Add Recipes</CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CForm
                    onSubmit={(e) => onFormSubmit(e)}
                    className="form-horizontal"
                  >
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Recipes Name</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            value={Uplodename}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">
                        Recipes Instractions
                      </CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>Instractions</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            value={Uplodename}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text-aria"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Recipes Category</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>Category</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            value={Uplodename}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Recipes CookTime</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>CookTime</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            value={Uplodename}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Recipes Servings</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>Servings</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            value={Uplodename}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Recipes Servings</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>Servings</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid={valideName == "valid" ? true : false}
                            invalid={valideName == "invalid" ? true : false}
                            id="prependedInput"
                            name="name"
                            size="16"
                            value={Uplodename}
                            onChange={(e) => onChangeNamme("name", e)}
                            type="text"
                          />
                        </CInputGroup>
                        <span className="errorTxt">{errors["name"]}</span>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <div className="controls">
                        <CLabel htmlFor="custom-file-input">
                          Recipes Image
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
                      </div>
                    </CFormGroup>

                    <div className="form-actions">
                      <CButton
                        type="submit"
                        color="primary"
                        disabled={
                          valideName == "valid" && valideFile == "valid"
                            ? false
                            : valideName == null && valideFile == null
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
