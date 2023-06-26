type DebounceCallback = (...args: any) => void;
type Timeout = number;

export default function debounce(
  callback: DebounceCallback,
  timeout: Timeout | undefined = 500
) {
  let timer: undefined | NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), timeout);
  };
}
