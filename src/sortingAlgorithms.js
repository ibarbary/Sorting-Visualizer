// Used 'parseFloat' and not 'Number' because the 1st can convert strings that have numbers & characters like "30px" while 'Number' can't so it gives NaN

async function BubbleSort(array, barsRef, speed) {
  for (let i = 0; i < array.length; ++i) {
    for (let j = 0; j < array.length - i - 1; ++j) {
      const currentHeight = parseFloat(barsRef.current[j].style.height);
      const nextHeight = parseFloat(barsRef.current[j + 1].style.height);

      barsRef.current[j].style.backgroundColor = "yellow";
      barsRef.current[j + 1].style.backgroundColor = "yellow";

      if (currentHeight > nextHeight) {
        [barsRef.current[j].style.height, barsRef.current[j + 1].style.height] =
          [
            barsRef.current[j + 1].style.height,
            barsRef.current[j].style.height,
          ];
      }

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, speed)
      );

      barsRef.current[j].style.backgroundColor = "aqua";
      barsRef.current[j + 1].style.backgroundColor = "aqua";
    }

    barsRef.current[array.length - i - 1].style.backgroundColor = "#00c04b";
  }
}

async function SelectionSort(array, barsRef, speed) {
  for (let i = 0; i < array.length; ++i) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; ++j) {
      const minHeight = parseFloat(barsRef.current[minIndex].style.height);
      const currHeight = parseFloat(barsRef.current[j].style.height);

      barsRef.current[minIndex].style.backgroundColor = "yellow";
      barsRef.current[j].style.backgroundColor = "yellow";

      if (currHeight < minHeight) {
        barsRef.current[minIndex].style.backgroundColor = "aqua";
        minIndex = j;
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      barsRef.current[minIndex].style.backgroundColor = "aqua";
      barsRef.current[j].style.backgroundColor = "aqua";
    }

    [barsRef.current[minIndex].style.height, barsRef.current[i].style.height] =
      [barsRef.current[i].style.height, barsRef.current[minIndex].style.height];

    barsRef.current[i].style.backgroundColor = "#00c04b";
  }
}

async function InsertionSort(array, barsRef, speed) {
  for (let i = 1; i < array.length; ++i) {
    let curr = i;
    let prev = i - 1;

    let currHeight = parseFloat(barsRef.current[curr].style.height);
    let prevHeight = parseFloat(barsRef.current[prev].style.height);

    while (currHeight < prevHeight) {
      barsRef.current[curr].style.backgroundColor = "yellow";
      barsRef.current[prev].style.backgroundColor = "yellow";

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, speed);
      });

      barsRef.current[curr].style.backgroundColor = "aqua";
      barsRef.current[prev].style.backgroundColor = "aqua";

      [barsRef.current[curr].style.height, barsRef.current[prev].style.height] =
        [
          barsRef.current[prev].style.height,
          barsRef.current[curr].style.height,
        ];

      --curr;
      --prev;

      if (curr == 0) break;

      currHeight = parseFloat(barsRef.current[curr].style.height);
      prevHeight = parseFloat(barsRef.current[prev].style.height);
    }
  }

  for (let i = 0; i < array.length; ++i) {
    barsRef.current[i].style.backgroundColor = "#00c04b";
  }
}

async function partition(array, barsRef, speed, low, high) {
  //pivot = barsRef.current[high];

  let i = low - 1;
  for (let j = low; j < high; ++j) {
    let currHeight = parseFloat(barsRef.current[j].style.height);
    let pivotHeight = parseFloat(barsRef.current[high].style.height);

    barsRef.current[j].style.backgroundColor = "yellow";
    barsRef.current[high].style.backgroundColor = "yellow";

    if (currHeight < pivotHeight) {
      ++i;

      [barsRef.current[i].style.height, barsRef.current[j].style.height] = [
        barsRef.current[j].style.height,
        barsRef.current[i].style.height,
      ];
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });

    barsRef.current[j].style.backgroundColor = "aqua";
    barsRef.current[high].style.backgroundColor = "aqua";
  }

  ++i;
  [barsRef.current[i].style.height, barsRef.current[high].style.height] = [
    barsRef.current[high].style.height,
    barsRef.current[i].style.height,
  ];

  barsRef.current[i].style.backgroundColor = "#00c04b";

  return i;
}

async function QuickSort(array, barsRef, speed, low, high) {
  if (low <= high) {
    let pivotIndex = await partition(array, barsRef, speed, low, high);

    await QuickSort(array, barsRef, speed, low, pivotIndex - 1);
    await QuickSort(array, barsRef, speed, pivotIndex + 1, high);
  }
}

async function merge(leftArr, rightArr, barsRef, speed, left, right) {
  //left and right are the index of start of leftArr & end of rightArr in the original array

  let i = 0;
  let j = 0;
  let newArr = [];

  while (i < leftArr.length && j < rightArr.length) {
    barsRef.current[left + i].style.backgroundColor = "yellow";
    barsRef.current[left + leftArr.length + j].style.backgroundColor = "yellow";

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, speed);
    });

    barsRef.current[left + i].style.backgroundColor = "aqua";
    barsRef.current[left + leftArr.length + j].style.backgroundColor = "aqua";

    if (leftArr[i] < rightArr[j]) {
      newArr.push(leftArr[i]);
      ++i;
    } else {
      newArr.push(rightArr[j]);
      ++j;
    }
  }

  while (i < leftArr.length) {
    newArr.push(leftArr[i]);
    ++i;
  }

  while (j < rightArr.length) {
    newArr.push(rightArr[j]);
    ++j;
  }

  for (let i = 0; i < newArr.length; ++i) {
    barsRef.current[left + i].style.height = `${newArr[i] * 10}px`;
  }

  return newArr;
}

async function MergeSort(array, barsRef, speed, left, right) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const leftArr = array.slice(0, mid);
  const rightArr = array.slice(mid);

  const leftMerge = await MergeSort(
    leftArr,
    barsRef,
    speed,
    left,
    left + mid - 1
  );
  const rightMerge = await MergeSort(
    rightArr,
    barsRef,
    speed,
    left + mid,
    right
  );

  const arr = await merge(leftMerge, rightMerge, barsRef, speed, left, right);

  return arr;
}

export { BubbleSort, SelectionSort, InsertionSort, QuickSort, MergeSort };
