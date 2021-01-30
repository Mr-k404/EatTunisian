import React, { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import axios from "axios";
import { CImg } from "@coreui/react";
import StarRatings from "react-star-ratings";
const ShowCared = (props) => {
  const [recipesData, setrecipesData] = useState([]);
  const [rating, setrating] = useState(0);
  const [errormsg, seterrormsg] = useState();

  useEffect(() => {
    axios
      .get(
        "http://localhost:8000/api/recipes/" + props.location.dataToUpdat.id,
        {}
      )
      .then((response) => {
        if (response.data.status === 200) {
          setrecipesData(response.data.data);
          setrating(response.data.data.rate);
        }
      })
      .catch((error) => {
        seterrormsg("[" + error.message + "]" + " : Please check your network");
        console.log(error);
      });
  });

  return (
    <>
      {/* <CCardHeader className="addIng">
        <p className="item1">{props.location.dataToUpdat.name}</p>
        <CButton className="item2" color="primary" shape="pill" size="sm">
          <a className="text-white" href="/recipes">
            <CIcon name="cilX-circle" />
          </a>
        </CButton>
      </CCardHeader> */}
      <div class="card-show">
        <div class="header">
          <CImg
            className="RImg"
            src={"http://localhost:8000/images/" + recipesData.image}
            fluid
          ></CImg>
        </div>
        <div class="text">
          <h1 class="food">{recipesData.name}</h1>
          <CIcon className="CIcon" name="cilClock" />
          {recipesData.cookTime} Mins
          <CIcon className="CIcon" name="cilGroup" />
          Serves
          {recipesData.servings}
          <CIcon className="CIcon" name="cilTag" />
          {recipesData.category}
          <div class="stars">
            <StarRatings
              rating={rating}
              starDimension="30px"
              starSpacing="5px"
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
            />
            {/* <Rating {...props} initialRating={rating} />
            <Rating
              start={0}
              stop={4}
              full={[1, 2, 3, 4].map((n) => (
                <CIcon name="cilStar" />
              ))}
            /> */}
          </div>
          <p class="info">{recipesData.instractions}</p>
        </div>
        <a href="#" class="btn">
          Let's Cook!
        </a>
      </div>
      {/* <img
            className="img-Thumbnail"
            src={
              "http://localhost:8000/images/" + props.location.dataToUpdat.img
            }
            alt={props.location.dataToUpdat.img}
          />
          <p>{props.location.dataToUpdat.id}</p>
          <p>{props.location.dataToUpdat.name}</p>
          <p>{props.location.dataToUpdat.cat}</p>
          <p>{props.location.dataToUpdat.img}</p> */}
    </>
  );
};

export default ShowCared;
