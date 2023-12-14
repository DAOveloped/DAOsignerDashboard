import { Button } from "antd";

const ChainSelector = ({ chains, handleChainSelect }) => {
  return (
    <div className="buttonsContainer">
      {chains &&
        chains.map((item) => {
          return (
            <Button
              type="primary"
              icon={<Logo url={item.logo_url} />}
              size="large"
              onClick={() => handleChainSelect(item.chain_id)}
              style={{ color: "var(--header-color)", marginRight: "10px" }}
            >
              {item.category_label}
            </Button>
          );
        })}
    </div>
  );
};

const Logo = ({ url }) => {
  return (
    <>
      <img src={url} alt="chains" height="25px" width="25px" />
    </>
  );
};

export default ChainSelector;
