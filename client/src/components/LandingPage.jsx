import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LandingPage.css'
import linkedin from ".././assets/linkedin.png"
import github from ".././assets/github.png"
import perrito from ".././assets/perrito.gif"


const LandingPage = () => {

        return (
            <div className="LandingContainer">
              <div className="contIzq">
                <div className="titleIndex">Henry Dogs</div>
                <div className="contTitle">
                  <div className="titleIndex">¡Welcome to my App!</div>
                  <div className="parrafo">
                  Let's share the love for dogs, here you will find as many as you want and you can create a new one if you wish.
                  </div>
                  <Link to="/home">
                    <button className="btnIntro">Click Me!</button>
                  </Link>
                </div>
        
                <div className="links">
                  <a
                    href="https://www.linkedin.com/in/bradleycaruci/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={linkedin} alt="linkedin" className="linkedin" />
                  </a>
        
                  <a
                    href="https://github.com/BradleyGCF"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {" "}
                    <img src={github} alt="github" className="github" />
                  </a>
                </div>
              </div>

              <div className="contDer">
              <img src={perrito} alt="perrito" className="perrito" />
              </div>

            </div>
          );
        };
export default LandingPage;

