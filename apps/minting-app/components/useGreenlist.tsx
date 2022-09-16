import { createContext, useContext, useEffect, useState } from "react";

export type Greenlist = {
  root: string;
  proofs: { leaf: string; proof: string[] }[];
};

const GreenlistContext = createContext<Greenlist | null>(null);

export function GreenlistProvider({ children }: { children: React.ReactNode }) {
  const [greenlist, setGreenlist] = useState<Greenlist | null>(null);

  useEffect(() => {
    fetch(`/api/greenlist`, {
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((response) => response.json())
      .then((greenlist) => {
        setGreenlist(greenlist);
      });
  }, []);

  return (
    <GreenlistContext.Provider value={greenlist}>
      {children}
    </GreenlistContext.Provider>
  );
}

export function useGreenlist() {
  return useContext(GreenlistContext);
}
