import { useEffect } from "react";

function useAutosizeTextArea(textAreaRef,value,editMode,filtered){
  useEffect(() => {
    if (textAreaRef&&editMode) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value, editMode, filtered]);
};

export default useAutosizeTextArea;