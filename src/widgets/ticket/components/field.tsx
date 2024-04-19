import { memo } from "react";
import { declineNumber } from "../utils";
import { NUM_TITLES } from "../constants";

interface FieldComponentProps {
  fieldNum: number;
  size: number;
  maxAllowedNums: number;
  selectedNums: number[];
  setSelectedNums: React.Dispatch<React.SetStateAction<number[]>>;
  winnerNums: number[];
}

const FieldComponent: React.FC<FieldComponentProps> = memo(function ({
  fieldNum,
  size,
  maxAllowedNums,
  selectedNums,
  setSelectedNums,
  winnerNums,
}: FieldComponentProps) {
  const field = Array(size)
    .fill(null)
    .map((_, i) => i + 1);

  const handleClick = (num: number) => {
    const copySelectedNums = [...selectedNums];
    if (copySelectedNums.includes(num)) {
      copySelectedNums.splice(copySelectedNums.indexOf(num), 1);
    } else {
      copySelectedNums.push(num);
    }
    if (copySelectedNums.length > maxAllowedNums) return;
    setSelectedNums(copySelectedNums);
  };

  const handleClasses = (num: number) => {
    const classes = ["number"];

    selectedNums.includes(num) && classes.push("active");
    winnerNums.includes(num) && classes.push("winner");

    return classes.join(" ");
  };

  return (
    <div className="field">
      <div className="field-header">
        <div className="title">Поле {fieldNum}</div>
        <div className="info">
          Отметьте {maxAllowedNums} {declineNumber(maxAllowedNums, NUM_TITLES)}.
        </div>
      </div>
      <div className="buttons-list">
        {field.map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            className={handleClasses(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
});

export default FieldComponent;
