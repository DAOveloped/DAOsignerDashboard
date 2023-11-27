import { useState } from 'react';
import Matrix from './Matrix';

const styles = `
.cards-container {
    display: flex;

    flex-wrap: wrap;
    max-width: 100%;
  }
  
  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    top: 100%;
    width: 90%;
    max-width: 800px;
    background-color: #fff;
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
  
  /* Position the description elements for specific columns */
  .column:nth-child(1) .card:hover .card__description {
    left: 30%;
    right: auto;
    transform: translateX(50%, 50%);
    width: 600%;
    background-color: #ccc;
  }
  
  .column:nth-child(2) .card:hover .card__description {
    top: 0;
    left: auto;
    right: auto;
  }

  .column:nth-child(2) {
    border: none;
  }

  .column:nth-child(1) {
    border: none;
  }

  .column:nth-child(3) {
    border: none;
  }
  
  .column:nth-child(3) .card:hover .card__description {
    left: auto;
    right: 30%;
    transform: translateX(50%, 50%);
  }

  
`;

const Card = ({ title, description }) => {
  const [showDescription, setShowDescription] = useState(false);


  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  return (
    <div className="card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h3 className="card__title">{title}</h3>
      <div className="card__description">
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
  const centralized = [
    { title: 'Electricity', description: (
 
        <div className="text-left">
        <div style={{ color: "var(--subtitle)", fontWeight: 'bold' }}>
        Electricity
        </div>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div> Government Concerns
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                    <li>Protecting consumers from loss of use due to a geopolitical situation</li>
                    <li>Amount of electricity required to maintain the blockchain and the amount per transaction</li>
                </ul>
            </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>Consumer Risks
                    <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                        <li>Potential geopolitical risks leading to electricity access disruptions</li>
                    </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>Cons to over-regulation
                    <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                        <li>Potential risks of concentration and control by certain countries</li>
                    </ul>
                </div>  
            </ul>   
  
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
            <h3>Cons to lack of regulation</h3>
            <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>Potential displacement of development activities to more permissive jurisdictions</li>
            </ul>
            </div>
        </ul>
        <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
            <h3>Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?</h3>
            </div>
        </ul>
        </div>
  
        ) },
    { title: 'Card 2', description: 'Description for card 2' },
    { title: 'Card 3', description: 'Description for card 3' },
    { title: 'Card 4', description: 'Description for card 4' },
    { title: 'Card 5', description: 'Description for card 5' },
    { title: 'Card 6', description: 'Description for card 6' },
    { title: 'Card 7', description: 'Description for card 7' },
    { title: 'Card 8', description: 'Description for card 8' },
    { title: 'Card 9', description: 'Description for card 9' },
    { title: 'Card 10', description: 'Description for card 10' },
    { title: 'Card 11', description: 'Description for card 11' },
    { title: 'Card 12', description: 'Description for card 12' },
    { title: 'Card 13', description: 'Description for card 13' },
    { title: 'Card 14', description: 'Description for card 14' },
    { title: 'Card 15', description: 'Description for card 15' },
    { title: 'Card 16', description: 'Description for card 16' },
    { title: 'Card 17', description: 'Description for card 17' },
  ];

  const decentralized = [
    { title: 'Card 18', description: 'Description for card 18' },
    { title: 'Card 19', description: 'Description for card 19' },
    { title: 'Card 20', description: 'Description for card 20' },
    { title: 'Card 21', description: 'Description for card 21' },
    { title: 'Card 22', description: 'Description for card 22' },
    { title: 'Card 23', description: 'Description for card 23' },
    { title: 'Card 24', description: 'Description for card 24' },
    { title: 'Card 25', description: 'Description for card 25' },
    { title: 'Card 26', description: 'Description for card 26' },
    { title: 'Card 27', description: 'Description for card 27' },
    { title: 'Card 28', description: 'Description for card 28' },
    { title: 'Card 29', description: 'Description for card 29' },
    { title: 'Card 30', description: 'Description for card 30' },
    { title: 'Card 31', description: 'Description for card 31' },
    { title: 'Card 32', description: 'Description for card 32' },
    { title: 'Card 33', description: 'Description for card 33' },
    { title: 'Card 34', description: 'Description for card 34' },
  ];

  const info = [
    { title: 'Info about the ', description: 'This section is about those that directly produce the electricity that powers the blockchain.' },
    { title: 'Card 19', description: 'Description for card 19' },
    { title: 'Card 20', description: 'Description for card 20' },
    { title: 'Card 21', description: 'Description for card 21' },
    { title: 'Card 22', description: 'Description for card 22' },
    { title: 'Card 23', description: 'Description for card 23' },
    { title: 'Card 24', description: 'Description for card 24' },
    { title: 'Card 25', description: 'Description for card 25' },
    { title: 'Card 26', description: 'Description for card 26' },
    { title: 'Card 27', description: 'Description for card 27' },
    { title: 'Card 28', description: 'Description for card 28' },
    { title: 'Card 29', description: 'Description for card 29' },
    { title: 'Card 30', description: 'Description for card 30' },
    { title: 'Card 31', description: 'Description for card 31' },
    { title: 'Card 32', description: 'Description for card 32' },
    { title: 'Card 33', description: 'Description for card 33' },
    { title: 'Card 34', description: 'Description for card 34' },
  ];

  const categorizedCards = [
    { title: 'Centralized', cards: centralized },
    { title: 'Info', cards: info },
    { title: 'Decentralized', cards: decentralized },

  ];

  return (
    <div>
            <h1 className="mb-5 mt-10 text-center text-4xl" style={{ color: 'var(--title)' }}>
        Blockchain Regulation Matrix
      </h1>
      <p className="mb-5 text-2xl" style={{ color: 'var(--subtitle)' }}>
        An overview of Blockchain Regulation Concentrations
      </p>
        <div className="mb-10 text-center mx-auto" style={{ color: 'var(--text)', maxWidth: '900px' }}>
            <p>
                The Blockchain Regulation Matrix (BRM) aims to construct a comprehensive framework outlining blockchain&apos;s regulation aspects.
                It delves into centralized and decentralized protocols, emphasizing compliance without compromising blockchain ethos.
                This matrix categorizes technology stacks and invites contributions to assess each layer&apos;s government concerns, consumer risks, regulatory pros, and cons.
            </p>
            <br></br>
            <p>
                This initiative aims to spotlight areas of concern, particularly focusing
                on aspects related to the Howie test&apos;s significance in determining whether a token qualifies
                as a security or commodity. However, paramount to all objectives is the identification
                of spaces within blockchain technology that adhere to its ethos while ensuring regulatory compliance.
            </p>
            <br></br>
            <p>
                The BRM comprises a conglomerate of technology and resources constituting the foundational
                structure of the blockchain and all its derivatives. Initially, the BRM dissects the blockchain
                stack into two core categories: centralized and decentralized. Subsequently, each category
                is subjected to a predefined set of inquiries across various layers of the blockchain stack.
            </p>
        </div>
          <div className='mb-10 mt-10 text-3xl' style={{ color: 'var(--title)' }}>Centralized and Decentralized</div>
          <style>{styles}</style>
          <div className="cards-container">
            {categorizedCards.map((category, index) => (
              <div key={index} className="column" style={{ width: '33%' }}>
                <h3>{category.title}</h3>
                {category.cards.map((card) => (
                  <Card key={card.title} title={card.title} description={card.description} />
                ))}
              </div>
            ))}
          </div>
          <div>
          <div className='mb-10 mt-20 text-3xl' style={{ color: 'var(--title)' }}>From a different perspective</div>
      <Matrix /> 
    </div>
    </div>
  );
};

export default App;