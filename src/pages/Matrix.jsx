import { useState } from 'react';

const Matrix = () => {
  const centralizedLayers = [
    { title: 'Electricity', description: (
      <div className="text-left mb-5 pl-10" >
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
    { title: 'Settlement Layer', description: 'Description for Settlement Layer' },
    { title: 'Node / Validator', description: 'Description for Node / Validator' },
    { title: 'Consensus Layer', description: 'Description for Consensus Layer' },
    { title: 'Transaction Layer', description: 'Description for Transaction Layer' },
    { title: 'Electricity', description: (
        <div>
          <ul className="list-disc pl-14">
            <li>
              Government Concerns
              <ul className="list-disc pl-18">
                <li>Protecting consumers from loss of use due to a geopolitical situation</li>
                <li>Amount of electricity required to maintain the blockchain and the amount per transaction</li>
              </ul>
            </li>
            <li>
              Consumer Risks
              <ul className="list-disc pl-18">
                <li>Potential geopolitical risks leading to electricity access disruptions</li>
              </ul>
            </li>
            <li>
              Cons to lack of regulation
              <ul className="list-disc pl-18">
                <li>Potential risks of concentration and control by certain countries</li>
              </ul>
            </li>
            <li><h3>Cons to over-regulation</h3></li>
            <li>Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?</li>
          </ul>
        </div>
      ) },
    { title: 'Asset Layer', description: 'Description for Asset Layer' },
    { title: 'Exchange Layer', description: 'Description for Exchange Layer' },
    { title: 'Protocol Layer', description: 'Description for Protocol Layer' },
    { title: 'Application Layer', description: 'Description for Application Layer' },
    { title: 'IPFS (if used)', description: 'Description for IPFS' },
    { title: 'Internet Browser', description: 'Description for Internet Browser' },
    { title: 'Developer', description: 'Description for Developer' },
    { title: 'Programming Language Auditor', description: 'Description for Programming Language Auditor' },
    { title: 'DeFi Architecture Security', description: 'Description for DeFi Architecture Security' },
    { title: 'DeFi Architecture Standards / Auditor', description: 'Description for DeFi Architecture Standards / Auditor' },
    { title: 'Fiat Onboarding / Offboarding Access', description: 'Description for Fiat Onboarding / Offboarding Access' },
  ];

  const decentralizedLayers = [
    { title: 'Electricity', description: (
 
      <div className="text-left mb-5 pl-10" >
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
    { title: 'Settlement Layer', description: 'Description for Settlement Layer' },
    { title: 'Node / Validator', description: 'Description for Node / Validator' },
    { title: 'Consensus Layer', description: 'Description for Consensus Layer' },
    { title: 'Transaction Layer', description: 'Description for Transaction Layer' },
    { title: 'On-chain Data Storage', description: 'Description for On-chain Data Storage' },
    { title: 'Asset Layer', description: 'Description for Asset Layer' },
    { title: 'Exchange Layer', description: 'Description for Exchange Layer' },
    { title: 'Protocol Layer', description: 'Description for Protocol Layer' },
    { title: 'Application Layer', description: 'Description for Application Layer' },
    { title: 'IPFS (if used)', description: 'Description for IPFS' },
    { title: 'Internet Browser', description: 'Description for Internet Browser' },
    { title: 'Developer', description: 'Description for Developer' },
    { title: 'Programming Language Auditor', description: 'Description for Programming Language Auditor' },
    { title: 'DeFi Architecture Security', description: 'Description for DeFi Architecture Security' },
    { title: 'DeFi Architecture Standards / Auditor', description: 'Description for DeFi Architecture Standards / Auditor' },
    { title: 'Fiat Onboarding / Offboarding Access', description: 'Description for Fiat Onboarding / Offboarding Access' },
  ];

  const [showDescription, setShowDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };


  return (
    <div>
      <div className="mt-10 matrix-container text-center pl-12">
        {centralizedLayers.map((layer, index) => (
          <div className="card" key={index}>
            <div className="title">{layer.title}</div>
            <div className="description">
              <div className="description-content">{layer.description}</div>
            </div>

            <style>
              {`
                .matrix-container {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 20px;
                }

                .card {
                  border: 1px solid #ccc;
                  padding: 10px;
                  width: 200px;
                  text-align: center;
                  cursor: pointer;
                  transition: transform 0.3s ease-in-out;
                }

                .title {
                  font-weight: bold;
                }
                
                .description {
                  position: relative;
                  transform: translateX(-50%);
                  width: 200%;
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

                  .card:hover {
                    transform: scale(1.1);
                    z-index: 1;
                    position: relative;
                  }

                .card:hover .description {
                  opacity: 1;
                  position: absolute;

                  z-index: 20;
                  display: block;

                  background-color: white;
                  padding: 20px;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                  text-align: left; /* Align text to the left */

                }
                 
                `}
            </style>
          </div>
        ))}
      </div>
      <h2 className="mt-5 header text-center text-3xl" style={{ color: 'var(--title)' }}>
        Centralization Projects Above and Decentralized Projects Below
      </h2>
      <div className="mt-10 matrix-container text-center pl-12">
        {decentralizedLayers.map((layer, index) => (
          <div className="card" key={index}>
            <div className="title">{layer.title}</div>
            <div className="description">
              <div className="description-content">{layer.description}</div>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default Matrix;