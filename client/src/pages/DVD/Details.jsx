import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import ErrorPage from "../../components/common/ErrorPage";
import Loader from "../../components/common/Loader";
import dvdService from "../../services/dvdService";
import MWNavLink from "../../components/common/MWNavLink";
import MWButton from "../../components/common/MWButton";
import { Container } from "react-bootstrap";

const DetailsCard = styled.div`
  margin: 5rem auto 2rem;
  padding: 2rem 2rem;
  height: 30vw;
  width: 80vh;
  background: var(--highlight-light);
  border-radius: 20px;
  box-shadow: 0 0 20px 8px var(--highlight);
`;

const Details = () => {
  //Custom Hooks
  const { user } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  //State
  const [data, setData] = useState({
    id: params.id,
    title: "",
    genre: "",
    rate: 0,
    stock: 0,
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Destructure data state nested object properties & instance of useNavigate class (NOTE IMAGE DESTRUCTURED)
  const { id, title, genre, rate, stock, image } = data;

  // HOOK: ON-LOAD SIDE EFFECTS
  useEffect(() => {
    // Pre-population fetch currency function (based on id)
    async function fetchDVDs() {
      try {
        const response = await dvdService.getById(id);
        const allDVDs = await response.data;

        setData((data) => ({
          ...data,
          ...allDVDs,
        }));
        setLoading(false);
      } catch (err) {
        console.log(err?.response);
        setError(true);
      }
    }
    fetchDVDs();
    setLoading(false);
  }, [id]);

  // COMPONENT FUNCTIONS
  // DELETION OF DOCUMENT
  const handleDeleteClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call API - must match server route + pass id to route
      await dvdService.del(id);

      // onSuccess - Redirect
      setLoading(false);
      navigate("/dvd");
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  // Handle Edit document
  const handleEditClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // onSuccess - Redirect
      navigate(`/dvd/${id}`);
    } catch (err) {
      console.log(err?.response);
      setError(true);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  // CONDITIONAL LOAD: ERROR
  if (error) {
    return (
      <Container className="text-center">
        <ErrorPage />
      </Container>
    );
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <DetailsCard>
        <h1 className="py-5 text-center">{title}</h1>
        <div className="info-section row align-items-center justify-content-center">
          <div className="info-image col-6 col-md-4">
            <img
              className="img-thumbnail image-fluid"
              src={image}
              alt={title}
            />
          </div>
          <div className="info-content col-6 col-md-4">
            <ul>
              <li>Genre: {genre}</li>
              <li>Rate: {rate}</li>
              <li>Stock: {stock}</li>
            </ul>
          </div>
        </div>
      </DetailsCard>
      { user && user.isAdmin && 
      <div className="text-center">
       
        <MWNavLink className={'me-5'} to={`/dvd/edit/${id}`}>Edit</MWNavLink>
        <MWButton onClick={handleDeleteClick} loadingState={loading}>
          {loading ? "..." : "Delete"}
        </MWButton>
     
      </div>
         }
    </Container>
  );
};

export default Details;
