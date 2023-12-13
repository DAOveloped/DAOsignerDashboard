import Matrix from "./Matrix";
import MatrixLongForm from "./MatrixLongForm";

export default function Contribute() {
  return (
    <div>
      <h1
        className="mb-5 mt-40 text-center title"
        style={{ color: "var(--header-color)", fontSize: "3rem" }}
      >
        Blockchain Regulation Matrix
      </h1>
      <div
        className="text-center mx-auto"
        style={{
          color: "var(--description-color)",
          maxWidth: "900px",
          fontSize: "1.2rem",
        }}
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
      <Matrix />
      <br></br>
      <MatrixLongForm />
    </div>
  );
}
