import Matrix from "./Matrix";

export default function Contribute() {
  return (
    <div>
      <h1
        className="mb-5 mt-10 text-center text-4xl"
        style={{ color: "var(--title)" }}
      >
        Contribute and Join
      </h1>
      <p className="mb-10 mt-10 text-2xl" style={{ color: "var(--subtitle)" }}>
        Join Crypto Policy DAO to enhance regulatory clarity and to promote
        blockchain innovation
      </p>
      <div
        className="mb-10 text-center mx-auto"
        style={{ color: "var(--text)", maxWidth: "900px" }}
      >
        <p>
          Interested in contributing to regulatory innovation in the blockchain
          space? Join Crypto Policy DAO, where policymakers and blockchain
          enthusiasts collaborate on regulatory and technical research in the
          web3 landscape.
        </p>
        <br></br>
        <p>
          To become a part of our community, clone our GitHub repository and
          propose your changes. Submit your alterations via pull requests for
          our evaluation. Once accepted, you will receive an exclusive NFT and
          gain access to our members-only chatroom for further collaboration.
        </p>
        <br></br>
        <p>
          Join us by providing your crypto wallet address and GitHub profile.
          Accepted contributors gain access to a dedicated platform within
          Crypto Policy DAO. This platform focuses on collaborative legislative
          efforts and research in blockchain technology.
        </p>
      </div>
      <Matrix />
    </div>
  );
}
