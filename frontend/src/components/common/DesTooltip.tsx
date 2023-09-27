import { InfoIcon } from "@chakra-ui/icons";
import { Tooltip } from "antd";

interface TooltipProps {
  text: string;
}

export const DesTooltip: React.FC<TooltipProps> = (props) => {
  const { text } = props;

  const textElement = <span>{text}</span>;

  return (
    <div>
      <Tooltip
        placement="top"
        zIndex={99999}
        title={textElement}
        arrow={false}
        color="#fff"
        overlayInnerStyle={{
          color: "#000",
          fontFamily: "Eurostile",
          fontSize: "18px",
        }}
      >
        <InfoIcon fontSize="14px" color="#999" />
      </Tooltip>
    </div>
  );
};
