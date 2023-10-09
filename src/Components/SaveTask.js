import {useState,useEffect} from "react";
const SaveTask = (key, initialValue) => {
  const [savedTask, setSaveTask] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(savedTask));
  }, [key, savedTask]);
  return [savedTask, setSaveTask];
};

export default SaveTask;
