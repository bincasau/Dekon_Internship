import { useCallback, useState } from "react";

type UseCounterOptions = {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
};
function useCounter({
  initialValue = 0,
  min = 0,
  max = 10,
  step = 1,
}: UseCounterOptions = {}) {
  const [count, setCount] = useState(initialValue);

  const increase = useCallback(() => {
    setCount((prev) => {
      const nextCount = prev + step;
      if (nextCount > max) return max;
      return nextCount;
    });
  }, [step, max]);

  const decrease = useCallback(() => {
    setCount((prev) => {
      const nextCount = prev - step;
      if (nextCount < min) return min;
      return nextCount;
    });
  }, [step, min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const setCustomCount = useCallback(
    (value: number) => {
      if (value < min) {
        setCount(min);
        return;
      }
      if (value > max) {
        setCount(max);
        return;
      }
      setCount(value);
    },
    [min, max],
  );

  const isMin = count === min;
  const isMax = count === max;

  return { count, increase, decrease, reset, setCustomCount, isMin, isMax };
}

export default function CustomHooks() {
  const { count, increase, decrease, reset, setCustomCount, isMin, isMax } =
    useCounter({
      initialValue: 5,
      min: 0,
      max: 20,
      step: 2,
    });

  return (
    <section>
      <h1>Custom Hook - Counter</h1>
      <p>Count: {count}</p>

      <div>
        <button onClick={decrease} disabled={isMin}>
          Giảm
        </button>

        <button onClick={increase} disabled={isMax}>
          Tăng
        </button>

        <button onClick={reset}>Reset</button>
      </div>

      <div>
        <button onClick={() => setCustomCount(5)}>Đặt thành 5</button>

        <button onClick={() => setCustomCount(15)}>Đặt thành 15</button>

        <button onClick={() => setCustomCount(100)}>Đặt thành 100</button>
      </div>

      {isMin && <p>Đã đạt giá trị tối thiểu</p>}
      {isMax && <p>Đã đạt giá trị tối đa</p>}
    </section>
  );
}
