import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [game, setGame] = useState({
    attacking_team_name: "",
    attack_score: "",
  });
  const [postForm, setPostForm] = useState({
    team_one_score: 0,
    team_two_score: 0,
  });

  return <div>Edit</div>;
};

export default Edit;
