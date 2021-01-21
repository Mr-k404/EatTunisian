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
} from "@coreui/react";
import axios from "axios";

const Creat = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [showElements, setShowElements] = React.useState(true);
  const [fileName, setFileName] = React.useState("Upload File");
  const [Uplodeimage, setImage] = React.useState();
  const [Uplodename, setName] = React.useState();

  const onFormSubmit = (e) => {
    e.preventDefault();
    fileUpload(Uplodeimage);
  };

  const onChangeFile = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    //console.log(Uplodeimage);
    createImage(files[0]);
    setFileName(e.target.files[0].name);
  };

  const onChangeNamme = (e) => {
    setName(e.target.value);
  };

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      // console.log(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const fileUpload = (image) => {
    axios
      .post("http://localhost:8000/api/ingredient/creat", {
        name: Uplodename,
        file: Uplodeimage,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(image);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader>Add Ingredient</CCardHeader>
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
                            <CInputGroupText>Name</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            valid
                            id="prependedInput"
                            name="name"
                            size="16"
                            onChange={(e) => onChangeNamme(e)}
                            type="text"
                          />
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="custom-file-input">
                        Ingredient Image
                      </CLabel>
                      <CCol xs="12">
                        <CInputFile
                          invalid
                          custom
                          size="16"
                          name="file"
                          onChange={(e) => onChangeFile(e)}
                          id="custom-file-input"
                        />
                        <CLabel
                          htmlFor="custom-file-input"
                          variant="custom-file"
                        >
                          {fileName}
                        </CLabel>
                      </CCol>
                    </CFormGroup>
                    <div className="form-actions">
                      <CButton type="submit" color="primary">
                        Save changes
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
