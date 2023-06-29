type StorageKey = "RESULT" | "SEARCH" | "SELECTED";

export function setItem(key: StorageKey, value: string | string[]) {
  localStorage.setItem(key, JSON.stringify(value));
  console.log("save localstorage");
}

export function getItem(key: StorageKey) {
  const item = localStorage.getItem(key);
  return JSON.parse(item);
}
