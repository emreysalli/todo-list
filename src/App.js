import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./App.css";
import Task from "./components/Task/Task.jsx";
import TaskEditDialog from "./components/TaskEditDialog/TaskEditDialog.jsx";
import AppBar from "./components/AppBar/AppBar.jsx";
import AddRow from "./components/AddRow/AddRow.jsx";
import FilterRow from "./components/FilterRow/FilterRow.jsx";
import usePagination from "./Pagination";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useSnackbar } from "notistack";

function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [filteredTask, setFilteredTask] = useState([]);
  const [priority, setPriority] = useState("");
  const [openDialog, setOpenDialog] = useState([false, ""]);
  const [page, setPage] = useState(1);
  const perPage = 5;
  const { enqueueSnackbar } = useSnackbar();

  const [query, setQuery] = useState("");

  const priorityObj = {
    Low: "green",
    Medium: "yellow",
    High: "orange",
    Immediately: "red",
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    let taskObj = {
      id: uuid(),
      text: task,
      isComplete: false,
      taskPriority: priority,
    };
    setTaskItems([...taskItems, taskObj]);
    setPriority("");
    setTask("");
    enqueueSnackbar("Task added.", {
      variant: "success",
    });
  };

  const completedTask = (id) => {
    let itemsCopy = [...taskItems];
    let index = itemsCopy.findIndex((item) => item.id === id);

    itemsCopy[index].isComplete = !itemsCopy[index].isComplete;

    setTaskItems(itemsCopy);
  };

  const deleteTask = (id) => {
    let itemsCopy = [...taskItems];
    let index = itemsCopy.findIndex((item) => item.id === id);
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);

    enqueueSnackbar("Task deleted.", {
      variant: "success",
    });
  };

  const filtered = (complete) => {
    if (complete === null) {
      setFilteredTask(taskItems);
      return;
    }

    let filtered = taskItems.filter((item) => {
      return item.isComplete === complete;
    });

    setFilteredTask(filtered);
  };

  useEffect(() => {
    let filtered = taskItems.filter((item) => {
      return item.isComplete === true;
    });

    if (filtered.length === 0) {
      document.querySelector(".clearCompBtn").style.display = "none";
    } else {
      document.querySelector(".clearCompBtn").style.display = "inline-block";
    }

    setFilteredTask(taskItems);
  }, [taskItems]);

  const clearCompleted = () => {
    let filtered = taskItems.filter((item) => {
      return item.isComplete === false;
    });

    setTaskItems(filtered);
  };

  const filterTask = (task) => {
    return task.id === openDialog[1];
  };

  const search = (items) => {
    return items.filter((item) => {
      if (query === "") {
        return item;
      } else {
        return item.text.toLowerCase().includes(query);
      }
    });
  };

  const count = Math.ceil(search(filteredTask).length / perPage);
  const _data = usePagination(search(filteredTask), perPage);
  const handleChangePage = (e, p) => {
    setPage(p);
    _data.jump(p);
  };

  return (
    <div>
      {openDialog[0] && (
        <TaskEditDialog
          open={openDialog}
          setOpen={setOpenDialog}
          priorityObj={priorityObj}
          task={filteredTask.filter(filterTask)}
          taskItems={taskItems}
          setTaskItems={setTaskItems}
          enqueueSnackbar={enqueueSnackbar}
        />
      )}
      <AppBar setQuery={setQuery} />
      <AddRow
        task={task}
        setTask={setTask}
        priorityObj={priorityObj}
        handleChange={handleChange}
        handleAddTask={handleAddTask}
        priority={priority}
      />
      <FilterRow
        taskCount={filteredTask.length}
        filtered={filtered}
        clearCompleted={clearCompleted}
      />
      <Box id="taskBox">
        {_data.currentData().map((item, index) => {
          return (
            <Task
              key={index}
              item={item}
              index={(_data.currentPage - 1) * perPage + index}
              priorityObj={priorityObj}
              setOpenDialog={setOpenDialog}
              completedTask={completedTask}
              deleteTask={deleteTask}
            />
          );
        })}
      </Box>
      <Pagination
        id="pagination"
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChangePage}
      />
    </div>
  );
}
export default App;
