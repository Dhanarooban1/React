import React, { useEffect, useReducer, useRef } from "react";

const reducer = (state, action) => {
 
  switch (action.type) {
    case "ADDTASK":
      return [...state, { text: action.text, isHidden: false }];
    case "HIDETASK":
      return state.map((each, index) =>
        index === action.index ? { ...each, isHidden: !each.isHidden } : each
      );
    default:
      return state;
  }
};

function Task() {
  const [task, dispatch] = useReducer(reducer, []);
  const inputRef = useRef(null);

  useEffect(() => {
   
    inputRef.current.focus();
  }, []);

  const handleClick = (text) => {
    dispatch({ type: "ADDTASK", text: text });
    inputRef.current.focus();
  };

  const handleToggleTask = (index) => {
 
    dispatch({ type: "HIDETASK", index: index });
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <input
        type="text"
        onKeyDown={(e) => {
          e.key == "Enter" ? (handleClick(e.target.value),e.target.value=""): null;
        }}
        ref={inputRef}
        placeholder="Enter your task"
      />

      {task.map((each, index) => {
        return (
          <div className="taskList" key={index}>
            {each.isHidden ? (
              <h3>[ The content is hidden ]</h3>
            ) : (
              <h3>{each.text}</h3>
            )}
            <button onClick={() => handleToggleTask(index)}>Toggle</button>
          </div>
        );
      })}
    </div>
  );
}

export default Task;