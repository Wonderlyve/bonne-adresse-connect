
import { useEffect } from "react";

export const usePageReset = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
