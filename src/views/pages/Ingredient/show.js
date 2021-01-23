import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CCollapse,
  CAlert,
} from "@coreui/react";
import axios from "axios";
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
const IngredientList = () => {
  const [details, setDetails] = useState([]);
  const [ingredientData, setingredientData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [Deletedmsg, setDeletedmsg] = useState();
  const [isLoading, setisLoading] = useState(false);

  const alert = () => {
    return (
      <div className="mt-3 ml-2 mr-2">
        <CAlert color="primary" closeButton fade={true} show={5}>
          {Deletedmsg}
        </CAlert>
      </div>
    );
  };

  const DeletHandler = (id) => {
    setisLoading(true);
    axios
      .post("http://localhost:8000/api/ingredient/delete/" + id, {})
      .then((response) => {
        if (response.data.status === 200) {
          setisLoading(false);
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
          setingredientData(response.data.data);
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
      {isDeleted ? alert() : null}
      <CCard>
        <CCardHeader className="addIng">
          <p className="item1">Ingredient List</p>
          <CButton className="item2" color="primary" shape="pill" size="sm">
            <a className="text-white px-2" href="/ingredient/creat">
              Add Ingredient
            </a>
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={ingredientData}
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
                  <img
                    className="img-Thumbnail"
                    src={"http://localhost:8000/images/" + item.img}
                    alt={item.img}
                  />
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
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <CButton color="success" size="sm">
                        <Link
                          className="text-white px-2"
                          to={{
                            pathname: "/ingredient/update",
                            dataToUpdat: {
                              id: item.id,
                              name: item.name,
                              img: item.img,
                            },
                          }}
                        >
                          Update
                        </Link>
                      </CButton>

                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-1"
                        onClick={() => DeletHandler(item.id)}
                      >
                        {isLoading ? (
                          <span
                            className="spinner-border spinner-border-sm ml-5 "
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <span> Delete </span>
                        )}
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />

          {/* <CDataTable
              items={ingredientData}
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
