import React, { useEffect, useState, createRef } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CCollapse,
  CAlert,
  CLink,
} from "@coreui/react";
import axios from "axios";
//import usersData from '../../users/UsersData'
import myimg from "../../../img/Logo.png";

const fields = [
  { key: "id", _style: { width: "10%" } },
  { key: "name", _style: { width: "40%" } },
  { key: "image", _style: { width: "40%" } },
  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const IngredientList = () => {
  const [details, setDetails] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [Deletedmsg, setDeletedmsg] = useState();
  const [visible, setVisible] = useState(2);

  const alert = () => {
    return (
      <div className="mt-3 ml-2 mr-2">
        <CAlert
          color="primary"
          closeButton
          fade="true"
          show={visible}
          onShowChange={setVisible}
        >
          {Deletedmsg}
        </CAlert>
      </div>
    );
  };

  const onExited = () => {
    setDeletedmsg(false);
  };

  const DeletHandler = (id) => {
    axios
      .post("http://localhost:8000/api/ingredient/delete/" + id, {})
      .then((response) => {
        if (response.data.status === 200) {
          setIsDeleted(true);
          setDeletedmsg(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/ingredient", {})
      .then((response) => {
        if (response.data.status === 200) {
          setUsersData(response.data.data);
          //setDataChanged(true)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isDeleted]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="addIng">
          <p className="item1">Ingredient List</p>
          <CButton className="item2" color="primary" shape="pill" size="sm">
            <a className="text-white px-2" href="/ingredient/creat">
              Add Ingredient
            </a>
          </CButton>
        </CCardHeader>
        {isDeleted ? alert() : null}
        <CCardBody>
          <CDataTable
            items={usersData}
            fields={fields}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              image: (item) => (
                <td>
                  {/* <CBadge color={getBadge(item.status)}>
                                            {item.status}
                                        </CBadge> */}
                  <img className="img-Thumbnail" src={myimg} alt="Forest" />
                </td>
              ),
              show_details: (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index);
                      }}
                    >
                      {details.includes(index) ? "Hide" : "Show"}
                    </CButton>
                  </td>
                );
              },
              details: (item, index) => {
                return (
                  <CCollapse show={details.includes(index)} onExited={onExited}>
                    <CCardBody>
                      <CButton size="sm" color="success">
                        Update
                      </CButton>
                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-1"
                        onClick={() => DeletHandler(item.id)}
                      >
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />

          {/* <CDataTable
              items={usersData}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'servings':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.servings)}>
                        {item.servings}
                      </CBadge>
                    </td>
                  )
              }}
            /> */}
        </CCardBody>
      </CCard>
    </>
  );
};

export default IngredientList;
