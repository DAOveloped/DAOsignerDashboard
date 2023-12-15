import imageFile from "../assets/DAOsigner.png";

export default function Home() {
  return (
    <div className="pt-40 flex items-center">
      <div className="w-1/2 text-center pl-20">
        <img src={imageFile} alt="DAOsigner Apparel" width="690" height="580" />
      </div>
      <div className="w-1/2 text-left" style={{ maxWidth: "800px" }}>
        <p
          className="text-left"
          style={{ color: "var(--header-color)", fontSize: "3rem" }}
        >
          DAOsigner Apparel
        </p>
        <br></br>
        <p
          className="text-left"
          style={{ color: "var(--header-color)", fontSize: "2rem" }}
        >
          Designs by You
        </p>

        <br></br>
        <div className="text-left">
          <p style={{ color: "var(--description-color)", fontSize: "1.2rem" }}>
            DAOsigner Apparel is a decentralized fashion house that allows you
            to design clothing that we advertise and sell for you. You earn
            20-30% of the profits for each sale, forever.
          </p>
          <br />
          <p style={{ color: "var(--content-color)", fontSize: "1.2rem" }}>
            Whether it's your first design or not, we want to help you get the
            global exposure you deserve. We are building a community of
            designers, artists, and crypto enthusiasts passionate about creating
            and selling unique designs.
          </p>
          <br />
          <p style={{ color: "var(--content-color)", fontSize: "1.2rem" }}>
            As a DAOsigner, you deserve to earn profits from your designs
            forever, not just today. That's why we created DAOsigner Apparel, so
            start designing and earning today!
          </p>
          <br />
          <p style={{ color: "var(--content-color)", fontSize: "1.2rem" }}>
            To submit your designs, please visit our submission form at{" "}
            <a href="https://app.deform.cc/form/27997b11-7f60-4298-9c99-7226ff9305eb/">
              DAOsigner Apparel Submission Form
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
