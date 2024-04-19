import { useEffect, useState, useRef } from "react";

interface IServerRequest {
  selectedNumber: { firstField: number[]; secondField: number[] };
  isTicketWon: boolean;
}

const useRequest = (sendData: IServerRequest) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setIsLoading(true);

    const sendRequest = async (data: IServerRequest, retry = 2) => {
      try {
        const response = await fetch("https://dummyjson.com/auth/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          if (retry > 0) {
            setTimeout(() => {
              sendRequest(data, retry - 1);
            }, 2000);
          } else {
            setIsLoading(false);
            setError("Не удалось отправить данные, статус: " + response.status);
            console.error("Request failed with status:", response.status);
          }
        }
      } catch (error) {
        if (retry > 0) {
          setTimeout(() => {
            sendRequest(data, retry - 1);
          }, 2000);
        } else {
          setIsLoading(false);
          setError("Возникла ошибка: " + (error as Error).message);
          console.error("Error occurred:", (error as Error).message);
        }
      }
    };
    sendRequest(sendData);
  }, [sendData]);

  return { error, setError, isLoading };
};

export default useRequest;
