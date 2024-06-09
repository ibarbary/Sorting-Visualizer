import { useContext } from "react";
import { Context } from "../GlobalContext";

const BarsContainer = () => {
  const { array, barsRef} = useContext(Context);

  return (
    <div className="barsContainer">
      {array.map((num, index) => {
        return (
          <div
            className="bar"
            key={index}
            style={{ height: num * 10}}
            ref={(element) => (barsRef.current[index] = element)}
          ></div>
        );
      })}
    </div>
  );
};
export default BarsContainer;
