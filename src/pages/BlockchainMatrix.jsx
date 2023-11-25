import React, { useState } from 'react';

function BlockchainMatrix() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
      <h1 className="mb-5 mt-10 text-center text-4xl">
        Blockchain Regulation Matrix
      </h1>
      <p className="mb-5 text-2xl">
        An overview of Blockchain Regulation Concentrations
      </p>
      <p>
        The Blockchain Regulation Matrix (BRM) aims to construct a comprehensive framework outlining blockchain's regulation aspects.
        It delves into centralized and decentralized protocols, emphasizing compliance without compromising blockchain ethos.
        This matrix categorizes technology stacks and invites contributions to assess each layer's government concerns, consumer risks, regulatory pros, and cons.
      </p>

      <p>
        This initiative aims to spotlight areas of concern, particularly focusing
        on aspects related to the Howie test's significance in determining whether a token qualifies
        as a security or commodity. However, paramount to all objectives is the identification
        of spaces within blockchain technology that adhere to its ethos while ensuring regulatory compliance.
      </p>

      <p>
        The BRM comprises a conglomerate of technology and resources constituting the foundational
        structure of the blockchain and all its derivatives. Initially, the BRM dissects the blockchain
        stack into two core categories: centralized and decentralized. Subsequently, each category
        is subjected to a predefined set of inquiries across various layers of the blockchain stack.
      </p>

      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline${!isExpanded ? ' mb-5' : ''}`}
        onClick={toggleExpanded}
      >
        {isExpanded ? 'Hide Blockchain Matrix' : 'Show Blockchain Matrix'}
      </button>

      {isExpanded && (
        <div className="expanded-content text-center">
          <h2 className="header text-center">
            The Blockchain Stack encompasses the layers involved throughout a transaction, spanning from electricity generation to end-user interaction.
          </h2>

          <p className="section-header">
            It consists of:
          </p>

          <div>Electricity</div>
          <div>Settlement Layer</div>
          {/* Other layers */}
          {/* ... */}

          <h3 className="text-center text-3xl text-base-content">
            Centralized Projects
          </h3>

          <div>
            <div style={{ fontWeight: 'bold' }}>
              Electricity
            </div>
            <ul className="list-disc pl-14">
              <li>
                Government Concerns
                <ul className="list-disc pl-18">
                  <li>Protecting consumers from loss of use due to a geopolitical situation</li>
                  <li>Amount of electricity required to maintain the blockchain and the amount per transaction</li>
                </ul>
              </li>
              {/* Other concerns */}
              {/* ... */}
            </ul>
          </div>

          {/* Other layers */}
          {/* ... */}

        </div>
      )}
    </div>
  );
}

export default BlockchainMatrix;
