export default function Home() {
  return (
    <div className="pt-20 flex items-center">
      <div className="w-1/3 text-center pl-10">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="w-2/3 text-left pl-20" style={{ maxWidth: '800px' }}>
        <p className="text-left" style={{ color: 'var(--header-color)', fontSize: '3rem' }}>
          Crypto Policy DAO
        </p>
        <br></br>
        <p className="text-left" style={{ color: 'var(--header-color)', fontSize: '2rem' }}>
          Web3-friendly Regulatory Think Tank
        </p>

        <br></br>
        <div className="text-left">
          <p style={{ color: 'var(--description-color)' }}>
            Our mission is to be a platform for policymakers and blockchain builders to collaborate on the technical and regulatory research of blockchain
            technologies that promote a web3-friendly regulatory environment. The speed of blockchain innovation is outpacing the regulatory environment
            and leaving legislators behind in understanding and creating web3-friendly regulation.
          </p>
          <br />
          <p style={{ color: 'var(--content-color)' }}>
            The underlying technology propelling the blockchain will continuously advance regardless of any political regulation,
            and for us to capture the benefits of emerging and innovative blockchain technology, we need to understand how and where regulation
            of the blockchain connect.
          </p>
        </div>
      </div>
    </div>
  );
}
