import { useState } from "react";
import {
  FIELD_1_MAX_SIZE,
  FIELD_1_MAX_ALLOWED_NUMS,
  FIELD_1_MAX_WIN_COUNT,
  FIELD_2_MAX_SIZE,
  FIELD_2_MAX_ALLOWED_NUMS,
  FIELD_2_MAX_WIN_COUNT,
} from "../constants";
import FieldComponent from "./field";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
import useRequest from "../hooks/useRequest";
import { generateRandomNums } from "../utils";

interface BoardComponentProps {
  ticketNum: number;
  isWinner: boolean;
  setIsWinner: (value: boolean) => void;
}

interface IServerRequest {
  selectedNumber: { firstField: number[]; secondField: number[] };
  isTicketWon: boolean;
}

const BoardComponent = ({
  ticketNum,
  isWinner,
  setIsWinner,
}: BoardComponentProps) => {
  const [selectedNums1, setSelectedNums1] = useState<number[]>([]);
  const [selectedNums2, setSelectedNums2] = useState<number[]>([]);
  const [winnerNums1, setWinnerNums1] = useState<number[]>([]);
  const [winnerNums2, setWinnerNums2] = useState<number[]>([]);
  const [repeat, setRepeat] = useState<boolean>(false);

  const [sendData, setSendData] = useState<IServerRequest>({
    selectedNumber: { firstField: selectedNums1, secondField: selectedNums2 },
    isTicketWon: isWinner,
  });
  const { error, setError, isLoading } = useRequest(sendData);

  const isTicketReady =
    selectedNums1.length === FIELD_1_MAX_ALLOWED_NUMS &&
    selectedNums2.length === FIELD_2_MAX_ALLOWED_NUMS;

  const handleClear = () => {
    setIsWinner(false);
    setSelectedNums1([]);
    setSelectedNums2([]);
    setWinnerNums1([]);
    setWinnerNums2([]);
    setRepeat(false);
    setError("");
  };

  const handleWinner = () => {
    const randomNums1 = generateRandomNums(
      FIELD_1_MAX_WIN_COUNT,
      FIELD_1_MAX_SIZE
    );
    const randomNums2 = generateRandomNums(
      FIELD_2_MAX_WIN_COUNT,
      FIELD_2_MAX_SIZE
    );

    setWinnerNums1(randomNums1);
    setWinnerNums2(randomNums2);

    const field1Count = selectedNums1.filter((num) =>
      randomNums1.includes(num)
    ).length;
    const field2Count = selectedNums2.filter((num) =>
      randomNums2.includes(num)
    ).length;

    if (field1Count >= 4 || (field1Count >= 3 && field2Count >= 1)) {
      setIsWinner(true);
    } else {
      setRepeat(true);
    }

    setSendData({
      selectedNumber: { firstField: selectedNums1, secondField: selectedNums2 },
      isTicketWon: isWinner,
    });
  };

  return (
    <>
      <HeaderComponent
        ticketNum={ticketNum}
        setSelectedNums1={setSelectedNums1}
        setSelectedNums2={setSelectedNums2}
        repeat={repeat}
        handleClear={handleClear}
      />
      <FieldComponent
        fieldNum={1}
        size={FIELD_1_MAX_SIZE}
        maxAllowedNums={FIELD_1_MAX_ALLOWED_NUMS}
        selectedNums={selectedNums1}
        setSelectedNums={setSelectedNums1}
        winnerNums={winnerNums1}
      />
      <FieldComponent
        fieldNum={2}
        size={FIELD_2_MAX_SIZE}
        maxAllowedNums={FIELD_2_MAX_ALLOWED_NUMS}
        selectedNums={selectedNums2}
        setSelectedNums={setSelectedNums2}
        winnerNums={winnerNums2}
      />
      <FooterComponent
        repeat={repeat}
        handleClear={handleClear}
        handleWinner={handleWinner}
        isTicketReady={isTicketReady}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default BoardComponent;
