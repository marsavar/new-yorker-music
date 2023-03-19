import { FC } from "react";
import svgLoader from "./loader.svg";

type LoadingProps = {
  text: string;
};
export const Loading: FC<LoadingProps> = ({ text }) => {
  return (
    <>
      <button className="loading">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <img src={svgLoader} height="40px" aria-hidden="true" />
          </div>
          <div style={{ marginLeft: "10px" }}>{text}</div>
        </div>
      </button>
    </>
  );
};
