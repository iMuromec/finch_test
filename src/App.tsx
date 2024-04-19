import "./styles.css";
import Ticket from "./widgets/ticket";

export default function App() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <Ticket key={i} ticketNum={i} />
      ))}
    </>
  );
}
