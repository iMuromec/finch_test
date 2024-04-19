interface FooterComponentProps {
  repeat: boolean;
  handleClear: () => void;
  handleWinner: () => void;
  isTicketReady: boolean;
  isLoading: boolean;
  error: string;
}

const FooterComponent = ({
  repeat,
  handleClear,
  handleWinner,
  isTicketReady,
  isLoading,
  error,
}: FooterComponentProps) => {
  return (
    <div className="actions">
      {isLoading ? (
        <button disabled={true}>Отправляем...</button>
      ) : repeat ? (
        <button onClick={handleClear}>Повторить</button>
      ) : (
        <button onClick={handleWinner} disabled={!isTicketReady}>
          Показать результат
        </button>
      )}
      <div className="error">{error}</div>
    </div>
  );
};

export default FooterComponent;
