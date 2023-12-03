import { useState } from "react";
import MatrixShortForm from "./MatrixShortForm";
import Matrix from "./Matrix";
import "../App.css";
import MatrixLongForm from "./MatrixLongForm";

const styles = `
  .cards-container {
    display: flex;
    justify-content: center; /* Align columns to the center horizontally */
    gap: 1rem; /* Adjust the gap between columns */
    flex-wrap: wrap;
    max-width: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1; /* Make the columns expand to fill the container */
    max-width: calc(33.333% - 8rem); /* Adjust the width of each column */
    margin: 0.5rem; /* Adjust the margin between columns */
  }
  
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    width: 90%; /* Adjust the width as desired */
    box-sizing: border-box; /* Include padding and border in the width calculation */
  }
  
  .card__title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .card__description {
    position: absolute;
    width: 90%;
    max-width: 800px;
    background-color: var(--background-color);
    padding: 1rem;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    display: none;
  }
  
  .card:hover .card__description {
    opacity: 1;
    display: block;
  }
  

  .column:nth-child(1) .card:hover .card__description {
    left: 50%;
    right: auto;
    transform: translateX(-50%, 50%);
    transform: translateX(50%, 50%);
    width: 600%;
    background-color: var(--nav2);
  }
  
  .column:nth-child(2) .card:hover .card__description {
    top: 0;
    left: auto;
    right: auto;
    transform: translateX(-50%, 50%);
    transform: translateX(50%, 50%);
  }

  .column:nth-child(3) .card:hover .card__description {
    left: auto;
    right: 30%;
    transform: translateX(50%, 50%);
  }

  .column:nth-child(1) {

  }

  .column:nth-child(3) {
    border: none;
  }
  
  .column:nth-child(1) .card {
    background-color: var(--nav2);
    border: none;

  }

  .column:nth-child(2) .card {
    border: none;
    background-image: 
      radial-gradient(circle at 10% 20%, var(--nav4), transparent),
      radial-gradient(circle at 80% 70%, var(--nav2), transparent),
      linear-gradient(to bottom right, var(--nav3), transparent),
      linear-gradient(to top left, var(--bac1), transparent),
      linear-gradient(to bottom, var(--bac5), transparent),
      url('path/to/your/background-image.jpg'); /* Replace 'path/to/your/background-image.jpg' with your actual image path */
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 15px; /* Adjust the value to control the roundness of the corners */
  }
  

  .column:nth-child(3) .card {
    background-color: var(--nav2);
    border: none;
  }

  
`;

// eslint-disable-next-line react/prop-types
const Card = ({ title, description }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h3 className="card__title">{title}</h3>
      <div
        className="card__description"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <p>{description}</p>
      </div>
      {showDescription && (
        <div className="card__description">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1
        className="mb-5 mt-20 text-center text-4xl"
        style={{ color: "var(--title)" }}
      >
        Blockchain Regulation Matrix
      </h1>
      <p className="mb-5 text-2xl" style={{ color: "var(--subtitle)" }}>
        An overview of Blockchain Regulation Concentrations
      </p>
      <div
        className="mb-10 text-center mx-auto"
        style={{ color: "var(--text)", maxWidth: "900px" }}
      >
        <p>
          The Blockchain Regulation Matrix (BRM) aims to construct a
          comprehensive framework outlining blockchain&apos;s regulation
          aspects. It delves into centralized and decentralized protocols,
          emphasizing compliance without compromising blockchain ethos. This
          matrix categorizes technology stacks and invites contributions to
          assess each layer&apos;s government concerns, consumer risks,
          regulatory pros, and cons.
        </p>
        <br></br>
        <p>
          This initiative aims to spotlight areas of concern, particularly
          focusing on aspects related to the Howie test&apos;s significance in
          determining whether a token qualifies as a security or commodity.
          However, paramount to all objectives is the identification of spaces
          within blockchain technology that adhere to its ethos while ensuring
          regulatory compliance.
        </p>
        <br></br>
        <p>
          The BRM comprises a conglomerate of technology and resources
          constituting the foundational structure of the blockchain and all its
          derivatives. Initially, the BRM dissects the blockchain stack into two
          core categories: centralized and decentralized. Subsequently, each
          category is subjected to a predefined set of inquiries across various
          layers of the blockchain stack.
        </p>
      </div>

      <div>
        <Matrix />
        <div className="mb-10 mt-20 text-3xl" style={{ color: "var(--title)" }}>
          Version #2 of the Blockchain Regulation Matrix
        </div>
        <MatrixShortForm />
        <div className="mb-10 mt-20 text-3xl" style={{ color: "var(--title)" }}>
          Version #3 of the Blockchain Regulation Matrix
        </div>
        <MatrixLongForm />
      </div>
    </div>
  );
};

export default App;
