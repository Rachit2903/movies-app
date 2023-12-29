import { useState ,useEffect} from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "./context";

const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);

  const [isLoading,setIsLoading]=useState(true);
  const [movie,setMovie]=useState("");
  

  const getMovie=async(url)=>{
      try{
          setIsLoading(true);
          const res=await fetch(`${url}&i=${id}`);
          const data=await res.json();
          console.log(data);
          
          if(data.Response==="True"){
              setIsLoading(false);
              setMovie(data);
          }
         
      }
      catch(error){
          console.log(error);
      }
  }
  useEffect(()=>{
      let timerOut=setTimeout(()=>{
          getMovie(API_URL);
      },800)
      return ()=>clearTimeout(timerOut);
  },[id])

  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;