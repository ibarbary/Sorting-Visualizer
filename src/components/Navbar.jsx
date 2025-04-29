import { useContext } from "react";
import {
  BubbleSort,
  InsertionSort,
  MergeSort,
  QuickSort,
  SelectionSort,
} from "../sortingAlgorithms";
import { Context } from "../GlobalContext";

const Navbar = () => {
  const {
    array,
    size,
    setSize,
    speed,
    setSpeed,
    barsRef,
    sorting,
    setSorting,
    sortingAlgorithm,
    setSortingAlgorithm,
    createRandomArray,
    resetBars,
  } = useContext(Context);

  async function handleSorting() {
    setSorting(true);

    if (sortingAlgorithm === "Bubble Sort") {
      await BubbleSort(array, barsRef, speed);
    } else if (sortingAlgorithm === "Selection Sort") {
      await SelectionSort(array, barsRef, speed);
    } else if (sortingAlgorithm === "Insertion Sort") {
      await InsertionSort(array, barsRef, speed);
    } else if (sortingAlgorithm === "Quick Sort") {
      await QuickSort(array, barsRef, speed, 0, array.length - 1);
    } else if (sortingAlgorithm === "Merge Sort") {
      await MergeSort(array, barsRef, speed, 0, array.length - 1);
      for (let i = 0; i < array.length; ++i) {
        barsRef.current[i].style.backgroundColor = "#00c04b";
      }
    }

    setSorting(false);
  }

  return (
    <div className="navbar">
      <span className="title">Sorting Visualizer</span>
      <div className="options">
        <label htmlFor="size">
          Size
          <input
            type="range"
            id="size"
            min="20"
            max="210"
            defaultValue={size}
            disabled={sorting}
            onChange={(e) => {
              setSize(e.target.value);
            }}
          ></input>
        </label>

        <label htmlFor="speed">
          Speed
          <input
            type="range"
            id="speed"
            min="0"
            max="500"
            defaultValue={speed}
            disabled={sorting}
            onChange={(e) => {
              setSpeed(500 - e.target.value);
            }}
          ></input>
        </label>

        <select
          disabled={sorting}
          style={{
            opacity: sorting ? 0.5 : 1,
            cursor: sorting ? "default" : "pointer",
          }}
          name="sortAlgorithms"
          id="sortAlgorithms"
          onChange={(e) => {
            setSortingAlgorithm(e.target.value);
          }}
        >
          <option value="Bubble Sort">Bubble Sort</option>
          <option value="Selection Sort">Selection Sort</option>
          <option value="Insertion Sort">Insertion Sort</option>
          <option value="Quick Sort">Quick Sort</option>
          <option value="Merge Sort">Merge Sort</option>
        </select>

        <button
          disabled={sorting}
          style={{
            opacity: sorting ? 0.5 : 1,
            cursor: sorting ? "default" : "pointer",
          }}
          onClick={() => {
            createRandomArray();
            resetBars();
          }}
        >
          Randomize
        </button>
        <button
          disabled={sorting}
          style={{
            opacity: sorting ? 0.5 : 1,
            cursor: sorting ? "default" : "pointer",
          }}
          onClick={() => {
            handleSorting();
          }}
        >
          Sort
        </button>
      </div>
    </div>
  );
};

export default Navbar;
