import { useState } from "react";

export const useName = (userName: string) => {
  const [name, setName] = useState(userName);

  return {
    name,
    setName,
  };
};
