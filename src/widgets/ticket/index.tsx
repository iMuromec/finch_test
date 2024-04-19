import "./styles.css";
import { useState } from "react";

import WinnerComponent from "./components/winner";
import BoardComponent from "./components/board";

export default function Ticket({ ticketNum = 1 }) {
  const [isWinner, setIsWinner] = useState<boolean>(false);

  return (
    <div className="ticket">
      <div className="ticket-wrapper">
        {isWinner ? (
          <WinnerComponent ticketNum={ticketNum} />
        ) : (
          <BoardComponent
            ticketNum={ticketNum}
            isWinner={isWinner}
            setIsWinner={setIsWinner}
          />
        )}
      </div>
    </div>
  );
}
