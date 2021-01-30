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
  "id",
  //"UserID",
  "name",
  //"instractions",
  "category",
  //"cookTime",
  //"servings",
  "rate",
  "image",

  {
    key: "show_details",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];
const RecipesList = () => {
  const [details, setDetails] = useState([]);
  const [recipesData, setrecipesData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [DeletedErr, setDeletedErr] = useState();
  const [Deletedmsg, setDeletedmsg] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [errormsg, seterrormsg] = useState();

  const alert = () => {
    return (
      <div className="mt-3 ml-2 mr-2">
        <CAlert color="success" closeButton fade={true} show={5}>
          {Deletedmsg}
        </CAlert>
      </div>
    );
  };

  const alertDelEr = () => {
    return (
      <div className="mt-3 ml-2 mr-2">
        <CAlert color="danger" closeButton fade={true} show={5}>
          Opps!We are not able to delet the Recipes!!
        </CAlert>
      </div>
    );
  };

  const DeletHandler = (id) => {
    setisLoading(true);
    axios
      .post("http://localhost:8000/api/recipes/delete/" + id, {})
      .then((response) => {
        if (response.data.status === 200) {
          setisLoading(false);
          setIsDeleted(true);
          setDeletedmsg(response.data.message);
        }
      })
      .catch((error) => {
        setisLoading(false);
        setDeletedErr(error);
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipes", {})
      .then((response) => {
        if (response.data.status === 200) {
          setrecipesData(response.data.data);
        }
      })
      .catch((error) => {
        seterrormsg("[" + error.message + "]" + " : Please check your network");
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
      {DeletedErr ? alertDelEr() : null}
      <CCard>
        <CCardHeader className="addIng">
          <p className="item1">Recipes List</p>
          <CButton className="item2" color="primary" shape="pill" size="sm">
            <a className="text-white px-2" href="/recipes/creat">
              Add Recipes
            </a>
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={recipesData}
            fields={fields}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            noItemsViewSlot={
              errormsg ? (
                <CAlert color="danger" closeButton fade={true}>
                  {errormsg}
                </CAlert>
              ) : null
            }
            sorter
            pagination
            scopedSlots={{
              image: (item) => (
                <td>
                  <img
                    className="img-Thumbnail"
                    src={"http://localhost:8000/images/" + item.image}
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
                            pathname: "/recipes/update",
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
                      <CButton size="sm" color="primary" className="ml-1">
                        <Link
                          className="text-white px-2"
                          to={{
                            pathname: "/recipes/show-details",
                            dataToUpdat: {
                              id: item.id,
                            },
                          }}
                        >
                          Show Details
                        </Link>
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                );
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default RecipesList;
