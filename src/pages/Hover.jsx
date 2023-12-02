import  { useEffect, useState } from 'react';



function Matrix() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight;
  
        const progress = (scrollPosition / (fullHeight - windowHeight)) * 100;
        setScrollProgress(progress);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    


    const inlineStyles = `

    .body {
        font-family: 'Poppins', sans-serif;
        font-weight: 200;
        font-size: 15px;
        line-height: 1.7;
        color: var(--effect-2);
        background-color: #1f2029;
        margin: 0;
        padding: 0;
        overflow-x: none;
      }
      
      
      p{
        font-family: 'Poppins', sans-serif;
        font-weight: 200;
        font-size: 16px;
        line-height: 1.7;
        color: var(--effect-2);
        margin: 0;
      }
      .section-fluid-main{
        position: relative;
        display: block;
        overflow: hidden;
        width: calc(100% - 10px);
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        max-width: 940px;
        padding: 100px 0;
      }
      .section-row{
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
      }
      .section-row:hover .section-col{
        opacity: 0.1;
      }
      .section-col{
        position: relative;
        width: 100%;
        -ms-flex: 0 0 50%;
        flex: 0 0 calc(100% / 3);
        max-width: 100%;
        transition: opacity 250ms linear;
        
      }
      .section-row .section-col:hover{
        opacity: 1;
      }
      .section{
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        cursor: pointer;
        padding: 15px;
      }
      .section-in{
        position: relative;
        display: block;
        width: 100%;
        overflow: hidden;
        border-radius: 6px;
        cursor: pointer;
      }
      .section-in img{
        display: block;
        width: 100%;
        height: auto;
        transition: transform 250ms linear;
      }
      .section-col:hover .section-in img{
        transform: scale(1.2);
      }
      
      .hover-text{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 100;
        pointer-events: none;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        justify-content: center;
        -ms-flex-pack: center;
        text-align: center;
          -ms-flex-item-align: center;
          align-self: center;
        mix-blend-mode: difference;
      }
      .hover-text h2{
        font-family: 'Poppins', sans-serif;
        font-weight: 800;
        
        line-height: 1;
        color: var(--effect-2);
        opacity: 0;
        transform: scale(0.8);
        transition: transform 250ms linear, opacity 250ms ease;
      }
      .section-col:hover + .hover-text h2{
        opacity: 1;
        transform: scale(1);
      }
      
      
      .logo {
        position: fixed;
        top: 25px;
        left: 25px;
        display: block;
        z-index: 1000;
        transition: all 250ms linear;
      }
      .logo img {
        display: block;
        transition: filter 250ms 700ms linear;
      }
      
      
      @media (max-width: 767px) {
        .section-col{
          -ms-flex: 0 0 100%;
          flex: 0 0 100%;
          max-width: 100%;
        }
        .hover-text h2{
          font-size: 3vw;
        }
        .section-fluid-main {
            position: relative;
          }
          
          .section-fluid-main h1 {
            position: sticky;
            top: 0;
            z-index: 1;
          }
        }

        
        `;


          
        
  return (

    
    <div className="section-fluid-main">
      <h1 className="mb-5 mt-10 text-center text-5xl" style={{ color: 'var(--title)' }}>
        Blockchain Regulation Matrix
      </h1>
		<div className="section-row">
			<div className="section-col" id="section1">
				<div className="section">
					<div className="section-in" >
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
                    
				</div>
			</div>
			<div className="hover-text">
				<h2>        <div className="text-left">
        <div style={{ color: "var(--subtitle)", fontWeight: 'bold' }}>
        Electricity
        </div>
            <ul className="list-disc pl-12" style={{ color: "var(--hover-text)" }}>
            <div> Government Concerns
                <ul className="list-disc pl-12" style={{ color: "var(--hover-text)" }}>
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
        </div></h2>
			</div>
            <div className="section-col">
                <div className="section">
                    <div className="section-in">
                    <img src="h4.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
                    </div>
                </div>
                <div className="line" style={{ position: 'absolute', top: '50%', left: '-3%', transform: 'translate(-50%, -50%)', width: '100px', height: '3px', background: "var(--subtitle)" }}></div>
                <div className="line" style={{ position: 'absolute', top: '50%', right: '-2%', transform: 'translate(50%, 50%)', width: '100px', height: '3px', background: "var(--subtitle)" }}></div>
                </div>

                  {/* === Marker Line === */}
                  {/* ================== */}
                  {/* ****************** */}
			<div className="hover-text" >
            <h2 className="text-5xl" style={{ maxWidth: '200px',  }}>
                    This section applies to those that produce the electricity that powers the blockchain.
                </h2>
			</div>
                  {/* === Marker Line === */}
                  {/* ================== */}
                  {/* ****************** */}
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>          <div className="text-left mb-5 pl-10" >
            <div style={{ color: "var(--subtitle)", fontWeight: 'bold' }}>
            Electricity
            </div>
                <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div> Government Concerns
                    <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                    <li>Protecting Consumers from loss of use due to a geopolitical situation</li>
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
                <li>Potential risks of concentration and control by certain countries</li>
                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?</h3>
                </div>
            </ul>
            </div></h2>
			</div>
            <div className="line" style={{ position: 'absolute', top: '50%', left: '-3%', transform: 'translate(-50%, -50%)', width: '100px', height: '3px', background: "var(--subtitle)" }}></div>
                <div className="line" style={{ position: 'absolute', top: '50%', right: '-2%', transform: 'translate(50%, 50%)', width: '100px', height: '3px', background: "var(--subtitle)" }}></div>
                  {/* === Marker Line === */}
                  {/* ================== */}
                  {/* ****************** */}
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>            <div className="text-left mb-5 pl-10">
            <div style={{ color: "var(--subtitle)", fontWeight: 'bold' }}>
                Settlement Layer
            </div>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Government Concerns</h3>
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                    <li>Not being able to update / edit fraudulent transactions</li>
                    <li>Not being able to identify immoral activity that could be deemed fraudulent</li>
                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Consumer Risks</h3>
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                    <li>Lack of due diligence</li>
                    <li>Security and attacks</li>
                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Cons to over-regulation</h3>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Cons to lack of regulation</h3>
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>

                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?</h3>
                </div>
            </ul>
            </div></h2>
			</div>
                  {/* === Marker Line === */}
                  {/* ================== */}
                  {/* ****************** */}
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="s2.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }}/>
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Future Settlement text</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="node.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }}/>
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Shy Portrait</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>            <div className="text-left mb-5 pl-10">
            <div style={{ color: "var(--subtitle)", fontWeight: 'bold' }}>
                Settlement Layer
            </div>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Government Concerns</h3>
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                    <li>Not being able to update / edit fraudulent transactions</li>
                    <li>Not being able to identify immoral activity that could be deemed fraudulent</li>
                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Consumer Risks</h3>
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                    <li>Lack of due diligence</li>
                    <li>Security and attacks</li>
                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Cons to over-regulation</h3>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Cons to lack of regulation</h3>
                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>

                </ul>
                </div>
            </ul>
            <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                <div>
                <h3>Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?</h3>
                </div>
            </ul>
            </div></h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="Consensus.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>            <div className="text-left mb-5 pl-10"></div>
                <div style={{ color: "var(--subtitle)", fontWeight: 'bold' }}>
                    Consensus Layer
                </div>
                <ul className="list-disc pl-12" style={{ color: "var(--subtitle)" }}>
                    <li>
                    Computation Intensive Based
                    <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                        <li>
                        Government Concerns
                        <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                            <li>Amount of electricity being used comparatively to similar technology that uses less</li>
                            <li>Fault tolerant consensus</li>
                            <li>Decryption Standards</li>
                        </ul>
                        </li>
                        <li>
                        Consumer Risks
                        <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                            <li>High energy consumption leading to environmental concerns</li>
                            <li>Potential centralization of mining power</li>
                            <li>Vulnerability to 51% attacks</li>
                        </ul>
                        </li>
                        <li>
                        Cons to over-regulation
                        <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                            <li>Stifling innovation and development of energy-efficient consensus mechanisms</li>
                            <li>Driving blockchain projects to operate in jurisdictions with more favorable regulations</li>
                            <li>Disincentivizing network participation due to excessive compliance requirements</li>
                        </ul>
                        </li>
                        <li>
                        Cons to lack of regulation
                        <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                            <li>Lack of standardization leading to security vulnerabilities</li>
                            <li>Potential for concentration of power among mining entities</li>
                            <li>Difficulty in addressing fraudulent or malicious activities</li>
                        </ul>
                        </li>
                        <li>
                        Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?
                        <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                            <li>Proof of Stake (PoS) consensus algorithms that require significantly less energy</li>
                            <li>Byzantine Fault Tolerance (BFT) protocols ensuring fault tolerance</li>
                            <li>Advanced encryption techniques for secure transactions and data privacy</li>
                        </ul>
                        </li>
                    </ul>
                    </li>

                        <li>
                        Voting Based
                        <ul className="list-disc pl-12 mb-5" style={{ color: "var(--subtitle)" }}>
                            <li>
                            Government Concerns
                            <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                                <li>Ensuring fair and transparent voting processes</li>
                                <li>Preventing voter fraud and manipulation</li>
                                <li>Addressing potential collusion or vote-buying</li>
                            </ul>
                            </li>
                            <li>
                            Consumer Risks
                            <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                                <li>Lack of anonymity in voting leading to privacy concerns</li>
                                <li>Vulnerability to Sybil attacks or stake concentration</li>
                                <li>Complexity of verifying the legitimacy of votes</li>
                            </ul>
                            </li>
                            <li>
                            Cons to over-regulation
                            <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                                <li>Overly strict regulations hindering the flexibility and innovation of voting mechanisms</li>
                                <li>Potential centralization of voting power due to stringent requirements</li>
                                <li>Difficulty in adapting to rapidly changing technological advancements</li>
                            </ul>
                            </li>
                            <li>
                                Cons to lack of regulation
                                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                                    <li>Vulnerability to malicious attacks on the voting process</li>
                                    <li>Lack of accountability and transparency in voting results</li>
                                    <li>Challenges in addressing disputes and irregularities</li>
                                </ul>
                            </li>
                            <li>Does blockchain technology currently exist to fulfill these obligations, and if so, what is it?
                                <ul className="list-disc pl-12" style={{ color: "var(--text)" }}>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul></h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="Consensus2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="Consensus3.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="Transaction.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="data.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="stable.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="c2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />
					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Mirror Reflection</h2>
			</div>
			<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="Fungible.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Funny Bunny</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Decentralized</h2>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Centralized</h2>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="nft.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
			<div className="hover-text">
				<h2>Topic</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Decentralized</h2>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Centralized</h2>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="p6.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
			<div className="hover-text">
				<h2>Topic</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="d2.png" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Decentralized</h2>
			</div>
            <div className="hover-text">
				<h2>Decentralized</h2>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
<div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="p5.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Centralized</h2>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="p5.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
{/* === Marker Line === */}
{/* ================== */}
{/* ****************** */}
{/* Rest of your JSX */}
			<div className="hover-text">
				<h2>Topic</h2>
			</div>
            <div className="section-col">
				<div className="section">
					<div className="section-in">
                    <img src="p4.jpg" alt="Logo" style={{ display: 'block', width: '200px', height: 'auto', margin: '0 auto' }} />

					</div>
				</div>
			</div>
			<div className="hover-text">
				<h2>Decentralized</h2>
			</div>
		</div>
        <style>{inlineStyles}</style>
	</div>
  );
}

export default Matrix;


