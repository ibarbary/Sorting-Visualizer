import { createContext, useEffect, useState, useRef } from "react";

export const Context = createContext(null);

export default function GlobalContext({ children }) {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(100);
  const [speed, setSpeed] = useState(20);
  const [sorting, setSorting] = useState(false);
  const [sortingAlgorithm, setSortingAlgorithm] = useState("Bubble Sort");
  let barsRef = useRef([]);

  function createRandomArray() {
    let arr = [];
    for (let i = 0; i < size; ++i) {
      arr.push(Math.ceil(Math.random() * 55));
    }

    setArray(arr);
  }

  function resetBars() {
    for (let i = 0; i < array.length; ++i) {
      barsRef.current[i].style.backgroundColor = "aqua";
    }
  }

  useEffect(() => {
    createRandomArray();
    resetBars();
  }, [size, sortingAlgorithm]);

  return (
    <Context.Provider
      value={{
        array,
        setArray,
        size,
        setSize,
        speed,
        setSpeed,
        sorting,
        setSorting,
        sortingAlgorithm,
        setSortingAlgorithm,
        barsRef,
        createRandomArray,
        resetBars,
      }}
    >
      {children}
    </Context.Provider>
  );
}
