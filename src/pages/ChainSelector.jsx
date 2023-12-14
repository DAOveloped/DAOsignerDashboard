import { Button } from "antd";

const ChainSelector = ({ chains, handleChainSelect }) => {
  const iconColor = "var(--header-color)";

  return (
    <div className="buttonsContainer">
      {chains &&
        chains.map((item) => {
          return (
            <Button
              type="primary"
              icon={<Logo url={item.logo_url} color={iconColor} />}
              size="large"
              onClick={() => handleChainSelect(item.chain_id)}
              style={{ color: iconColor }}
            >
              {item.category_label}
            </Button>
          );
        })}
    </div>
  );
};

const Logo = ({ url, color }) => {
  return (
    <>
      <img
        src={url}
        alt="chains"
        height="28px"
        width="28px"
        style={{ color: color }}
      />
    </>
  );
};

export default ChainSelector;
