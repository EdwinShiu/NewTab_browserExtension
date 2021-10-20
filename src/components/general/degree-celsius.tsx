import { DegreeCelsiusType } from "../../types/types/components/general/degree-celsius";

/**
 * This shows the degree celsius character with font family
 *
 * @param fontSize is the font size of the character
 * @returns a degree celsius character
 */
const DegreeCelsius = ({ fontSize }: DegreeCelsiusType) => {
  return (
    <div
      style={{
        position: "relative",
        fontSize: `${fontSize}px`,
        marginLeft: "6px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: `${fontSize * 0.35}px`,
        }}
      >
        o
      </div>
      C
    </div>
  );
};

export default DegreeCelsius;
