import { generateRandomNums } from "../utils";
import MagicWand from "../ui/magic-wand";
import {
  FIELD_1_MAX_SIZE,
  FIELD_1_MAX_ALLOWED_NUMS,
  FIELD_2_MAX_SIZE,
  FIELD_2_MAX_ALLOWED_NUMS,
} from "../constants";

interface HeaderComponentProps {
  ticketNum: number;
  repeat: boolean;
  setSelectedNums1: (value: number[]) => void;
  setSelectedNums2: (value: number[]) => void;
  handleClear: () => void;
}

const HeaderComponent = ({
  ticketNum,
  setSelectedNums1,
  setSelectedNums2,
  repeat,
  handleClear,
}: HeaderComponentProps) => {
  const handleMagicWand = () => {
    if (repeat) handleClear();

    setSelectedNums1(
      generateRandomNums(FIELD_1_MAX_ALLOWED_NUMS, FIELD_1_MAX_SIZE)
    );
    setSelectedNums2(
      generateRandomNums(FIELD_2_MAX_ALLOWED_NUMS, FIELD_2_MAX_SIZE)
    );
  };

  return (
    <>
      <div className="ticket-header">
        <div className="title">Билет {ticketNum}</div>
        <div className="magic-wand" onClick={handleMagicWand}>
          <MagicWand />
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
