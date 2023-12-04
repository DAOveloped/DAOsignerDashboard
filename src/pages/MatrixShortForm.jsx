const MatrixShortForm = () => {
  const centralizedLayers = [
    {
      title: "Electricity",
      description: (
        <div className="text-left mb-5 pl-10">
          <div style={{ color: "var(--subtitle)", fontWeight: "bold" }}>
            Electricity
          </div>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              {" "}
              Government Concerns
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Protecting consumers from loss of use due to a geopolitical
                  situation
                </li>
                <li>
                  Amount of electricity required to maintain the blockchain and
                  the amount per transaction
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              Consumer Risks
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential geopolitical risks leading to electricity access
                  disruptions
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              Cons to over-regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential risks of concentration and control by certain
                  countries
                </li>
              </ul>
            </div>
          </ul>

          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              <h3>Cons to lack of regulation</h3>
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential displacement of development activities to more
                  permissive jurisdictions
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              <h3>
                Does blockchain technology currently exist to fulfill these
                obligations, and if so, what is it?
              </h3>
            </div>
          </ul>
        </div>
      ),
    },
    {
      title: "Node / Validator",
      description: "Description for Node / Validator",
    },
    {
      title: "Node / Validator",
      description: "Description for Node / Validator",
    },
    {
      title: "Consensus Layer",
      description: "Description for Consensus Layer",
    },
    {
      title: "Transaction Layer",
      description: "Description for Transaction Layer",
    },
    {
      title: "Data Storage",
      description: (
        <div>
          <ul className="list-disc pl-14">
            <li>
              Government Concerns
              <ul className="list-disc pl-18">
                <li>
                  Protecting consumers from loss of use due to a geopolitical
                  situation
                </li>
                <li>
                  Amount of electricity required to maintain the blockchain and
                  the amount per transaction
                </li>
              </ul>
            </li>
            <li>
              Consumer Risks
              <ul className="list-disc pl-18">
                <li>
                  Potential geopolitical risks leading to electricity access
                  disruptions
                </li>
              </ul>
            </li>
            <li>
              Cons to lack of regulation
              <ul className="list-disc pl-18">
                <li>
                  Potential risks of concentration and control by certain
                  countries
                </li>
              </ul>
            </li>
            <li>
              <h3>Cons to over-regulation</h3>
            </li>
            <li>
              Does blockchain technology currently exist to fulfill these
              obligations, and if so, what is it?
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Asset Layer",
      description: (
        <div className="text-left mb-5 pl-10">
          <div style={{ color: "var(--subtitle)", fontWeight: "bold" }}>
            Asset Layer
          </div>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              {" "}
              Government Concerns
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Protecting consumers from loss of use due to a geopolitical
                  situation
                </li>
                <li>
                  Amount of electricity required to maintain the blockchain and
                  the amount per transaction
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              Consumer Risks
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential geopolitical risks leading to electricity access
                  disruptions
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              Cons to over-regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential risks of concentration and control by certain
                  countries
                </li>
              </ul>
            </div>
          </ul>

          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              <h3>Cons to lack of regulation</h3>
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential displacement of development activities to more
                  permissive jurisdictions
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              <h3>
                Does blockchain technology currently exist to fulfill these
                obligations, and if so, what is it?
              </h3>
            </div>
          </ul>
        </div>
      ),
    },
    { title: "Exchange Layer", description: "Description for Exchange Layer" },
    { title: "Protocol Layer", description: "Description for Protocol Layer" },
    {
      title: "Application Layer",
      description: "Description for Application Layer",
    },
    { title: "IPFS (if used)", description: "Description for IPFS" },
    {
      title: "Internet Browser",
      description: (
        <div className="text-left mb-5 pl-10">
          <div style={{ color: "var(--subtitle)", fontWeight: "bold" }}>
            Internet Browser Layer
          </div>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <li>
              Gov&apos;t Concerns
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Facilitating international business transactions and trade
                </li>
                <li>Enabling international dispute resolution mechanisms</li>
                <li>
                  Ensuring secure wallet integration and user data protection
                </li>
              </ul>
            </li>
            <li>
              Consumer Risks
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Privacy concerns due to browser tracking and data collection
                </li>
                <li>
                  Potential exposure to malicious websites and phishing attacks
                </li>
                <li>
                  Risk of unauthorized access to integrated wallets and
                  sensitive data
                </li>
                <li>
                  Dependence on browser security for safeguarding cryptocurrency
                  transactions
                </li>
              </ul>
            </li>
            <li>
              Cons to over-regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Excessive regulations stifling innovation and development of
                  blockchain-integrated browsers
                </li>
                <li>
                  Potential barriers to international collaboration and
                  cross-border data flows
                </li>
                <li>
                  Complex compliance requirements hindering user adoption and
                  accessibility
                </li>
              </ul>
            </li>
            <li>
              Cons to lack of regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Lack of specific support for addressing social engineering
                  threats through the browser
                </li>
              </ul>
            </li>
            <li>
              Does blockchain tech exist for this?
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li />
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Developer",
      description: (
        <div className="text-left mb-5 pl-10">
          <div style={{ color: "var(--subtitle)", fontWeight: "bold" }}>
            Developer Layer
          </div>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <li>
              Gov&apos;t Concerns
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Facilitating international business transactions and trade
                </li>
                <li>Why regulate the developer instead of the end product?</li>
                <li>
                  Is this a significant harm to the public currently being
                  unregulated?
                </li>
                <li>
                  Ensuring code quality and security in blockchain applications
                </li>
                <li>
                  Minimizing risks of vulnerabilities and exploits in the
                  blockchain ecosystem
                </li>
                <li>
                  Addressing potential misuse of blockchain technology for
                  illegal or malicious purposes
                </li>
              </ul>
            </li>
            <li>
              Consumer Risks
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  How can I protect myself without having to be a smart contract
                  auditor?
                </li>
                <li>
                  Exposure to smart contract vulnerabilities and financial
                  losses
                </li>
                <li>
                  Lack of recourse in case of errors or bugs in blockchain
                  applications
                </li>
                <li>
                  Difficulty in verifying the security and legitimacy of
                  third-party smart contracts
                </li>
                <li>
                  Limited understanding of complex blockchain technologies
                  leading to mistakes
                </li>
                <li>No coding or certification requirements or standards</li>
              </ul>
            </li>
            <li>
              Cons to over-regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Excessive regulations stifling innovation and hindering
                  developer experimentation
                </li>
                <li>
                  Barriers to entry for developers, limiting accessibility and
                  diversity in the ecosystem
                </li>
                <li>
                  Potential migration of developers to more permissive
                  jurisdictions
                </li>
                <li>
                  Slowing down the pace of technological advancement in the
                  blockchain space
                </li>
              </ul>
            </li>
            <li>
              Cons to lack of regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Proliferation of insecure and unreliable smart contracts
                </li>
                <li>
                  Lack of standardized coding practices leading to increased
                  risks
                </li>
                <li>
                  Difficulty in addressing disputes and liabilities arising from
                  faulty code
                </li>
                <li>
                  Undermining public confidence in blockchain technology due to
                  frequent incidents
                </li>
              </ul>
            </li>
            <li>
              Does any standardization exist for this?
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li />
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Programming Language Auditor",
      description: "Description for Programming Language Auditor",
    },
    {
      title: "DeFi Architecture Security",
      description: "Description for DeFi Architecture Security",
    },
    {
      title: "DeFi Architecture Standards / Auditor",
      description: "Description for DeFi Architecture Standards / Auditor",
    },
    {
      title: "Fiat Onboarding / Offboarding Access",
      description: "Description for Fiat Onboarding / Offboarding Access",
    },
  ];

  const decentralizedLayers = [
    {
      title: "Electricity",
      description: (
        <div className="text-left mb-5 pl-10">
          <div style={{ color: "var(--subtitle)", fontWeight: "bold" }}>
            Electricity
          </div>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              {" "}
              Government Concerns
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Protecting consumers from loss of use due to a geopolitical
                  situation
                </li>
                <li>
                  Amount of electricity required to maintain the blockchain and
                  the amount per transaction
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              Consumer Risks
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential geopolitical risks leading to electricity access
                  disruptions
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              Cons to over-regulation
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential risks of concentration and control by certain
                  countries
                </li>
              </ul>
            </div>
          </ul>

          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              <h3>Cons to lack of regulation</h3>
              <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                <li>
                  Potential displacement of development activities to more
                  permissive jurisdictions
                </li>
              </ul>
            </div>
          </ul>
          <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
            <div>
              <h3>
                Does blockchain technology currently exist to fulfill these
                obligations, and if so, what is it?
              </h3>
            </div>
          </ul>
        </div>
      ),
    },
    {
      title: "Settlement Layer",
      description: "Description for Settlement Layer",
    },
    {
      title: "Node / Validator",
      description: "Description for Node / Validator",
    },
    {
      title: "Consensus Layer",
      description: "Description for Consensus Layer",
    },
    {
      title: "Transaction Layer",
      description: "Description for Transaction Layer",
    },
    {
      title: "Data Storage",
      description: "Description for On-chain Data Storage",
    },
    { title: "Asset Layer", description: "Description for Asset Layer" },
    { title: "Exchange Layer", description: "Description for Exchange Layer" },
    { title: "Protocol Layer", description: "Description for Protocol Layer" },
    {
      title: "Application Layer",
      description: "Description for Application Layer",
    },
    { title: "IPFS (if used)", description: "Description for IPFS" },
    {
      title: "Internet Browser",
      description: "Description for Internet Browser",
    },
    { title: "Developer", description: "Description for Developer" },
    {
      title: "Programming Language Auditor",
      description: "Description for Programming Language Auditor",
    },
    {
      title: "DeFi Architecture Security",
      description: "Description for DeFi Architecture Security",
    },
    {
      title: "DeFi Architecture Standards / Auditor",
      description: "Description for DeFi Architecture Standards / Auditor",
    },
    {
      title: "Fiat Onboarding / Offboarding Access",
      description: "Description for Fiat Onboarding / Offboarding Access",
    },
  ];

  return (
    <div>
      {/* Centralized Layers */}
      <div className="mt-10 matrix-container text-center pl-12">
        {centralizedLayers.map((layer, index) => (
          <div className={`card centralized-card-${index}`} key={index}>
            <div className="title">{layer.title}</div>
            <div className="description">
              <div>{layer.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Decentralized Layers */}
      <h2
        className="mt-5 header text-center text-3xl"
        style={{ color: "var(--title)" }}
      >
        Centralization Projects Above and Decentralized Projects Below
      </h2>
      <div className="mt-10 matrix-container text-center pl-12">
        {decentralizedLayers.map((layer, index) => (
          <div className={`card decentralized-card-${index}`} key={index}>
            <div className="title">{layer.title}</div>
            <div className="description">
              <div>{layer.description}</div>
            </div>
          </div>
        ))}
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
                  width: 200%;
                  max-width: 800px;
                  padding: 1rem;
                  border: 1px solid #ccc;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                  z-index: 1;
                  opacity: 0;
                  transition: opacity 0.2s ease-in-out;
                  display: none;
                  font-size: 0.8rem;
                  }

                  .card:hover {
                    transform: scale(1.1);
                    z-index: 1;
                    position: relative;
                  }

                 
                `}
      </style>
      <style>
        {centralizedLayers.map(
          (_, index) =>
            index === 0 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: 100%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {centralizedLayers.map(
          (_, index) =>
            index === 1 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: 10%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* Node / Validator */}
        {centralizedLayers.map(
          (_, index) =>
            index === 2 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -90%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* consensus layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 3 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -190%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* transaction layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 4 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -290%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* data storage */}
        {centralizedLayers.map(
          (_, index) =>
            index === 5 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            right: 100%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* asset layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 6 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: 100%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          
          `
        )}
        {/* exchange layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 7 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: 10%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* protocol layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 8 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -90%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* application layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 9 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -190%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* ipfs */}
        {centralizedLayers.map(
          (_, index) =>
            index === 10 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -290%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* internet browser */}
        {centralizedLayers.map(
          (_, index) =>
            index === 11 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            right: 100%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* developer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 12 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: 100%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          
          `
        )}
        {/* programming language auditor */}
        {centralizedLayers.map(
          (_, index) =>
            index === 13 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: 10%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* defi architecture security */}
        {centralizedLayers.map(
          (_, index) =>
            index === 14 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -90%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* application layer */}
        {centralizedLayers.map(
          (_, index) =>
            index === 15 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -190%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* fiat onboarding / offboarding */}
        {centralizedLayers.map(
          (_, index) =>
            index === 16 &&
            `
          .centralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            top: 100%;
            left: -290%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
      </style>
      <style>
        {/* electricity */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 0 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 70%;
            left: 100%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}

        {/* settlement layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 1 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: 10%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* Node / Validator */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 2 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -90%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* consensus layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 3 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -190%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* transaction layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 4 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -290%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* data storage */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 5 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            right: 100%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* asset layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 6 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: 100%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* exchange layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 7 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: 10%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* protocol layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 8 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -90%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* application layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 9 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -190%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* ipfs */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 10 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -290%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* internet storage */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 11 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            right: 100%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* developer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 12 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: 100%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* programming language auditor */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 13 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: 10%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* defi architecture security */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 14 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -90%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* application layer */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 15 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -190%;
            transform: translateX(-50%);
            width: 600%;
            right: auto;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
        {/* fiat onboarding / offboarding */}
        {decentralizedLayers.map(
          (_, index) =>
            index === 16 &&
            `
          .decentralized-card-${index}:hover .description {
            opacity: 1;
            position: absolute;
            bottom: 100%;
            left: -290%;
            transform: translateX(-50%);
            width: 600%;
            z-index: 20;
            display: block;
            transform: scale(1.1);
            background-color: var(--hover-description-background);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: left; /* Align text to the left */
          }
          `
        )}
      </style>
    </div>
  );
};

export default MatrixShortForm;
