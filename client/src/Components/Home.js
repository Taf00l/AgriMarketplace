import React, { useState } from "react";
import "./home.css";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
} from "reactstrap";
import Benefits from "../Jxs Componetnts/Benefits";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CommentSystem from "../Jxs Componetnts/Comments";
const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <di>
      <di>
        <Benefits />
      </di>
      <di>
        <CommentSystem />{" "}
      </di>
    </di>
  );
};
export default Home;
