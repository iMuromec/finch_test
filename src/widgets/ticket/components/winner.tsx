const WinnerComponent = ({ ticketNum }: { ticketNum: number }) => {
  return (
    <>
      <div className="ticket-header">
        <div className="title">Билет {ticketNum}</div>
      </div>
      <div className="body">
        <div className="info">Ого, вы выиграли! Поздравляем!</div>
      </div>
    </>
  );
};

export default WinnerComponent;
