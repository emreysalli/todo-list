import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./MainWindow.css";
import Task from "../../Task/Task.jsx";
import TaskEditDialog from "../../TaskEditDialog/TaskEditDialog.jsx";
import AddRow from "../../AddRow/AddRow.jsx";
import FilterRow from "../../FilterRow/FilterRow.jsx";
import usePagination from "../../../Pagination";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useSnackbar } from "notistack";
import { auth, db } from "../../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function MainWindow(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [task, setTask] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [priority, setPriority] = useState("");
  const [openDialog, setOpenDialog] = useState([false, ""]);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const priorityObj = {
    Low: "green",
    Medium: "yellow",
    High: "orange",
    Immediately: "red",
  };
  const [userUid, setUserUid] = useState("");
  // firestoredan veriler cekildi
  useEffect(() => {
    const getTask = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userCollectionRef = doc(db, "usersandtasks", user.uid);
          setUserUid(user.uid);
          const docSnap = await getDoc(userCollectionRef);
          props.setTaskItems(docSnap.data()["tasks"]);
        }
      });
    };
    getTask();
  }, []);

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    let taskObj = {
      id: uuid(),
      text: task,
      isComplete: false,
      taskPriority: priority,
    };
    await props.setTaskItems([...props.taskItems, taskObj]);

    await setDoc(
      doc(db, "usersandtasks", userUid),
      { tasks: [...props.taskItems, taskObj] },
      { merge: true }
    );
    setPriority("");
    setTask("");
    enqueueSnackbar("Task added.", {
      variant: "success",
    });
  };

  const completedTask = (id) => {
    let itemsCopy = [...props.taskItems];
    let index = itemsCopy.findIndex((item) => item.id === id);

    itemsCopy[index].isComplete = !itemsCopy[index].isComplete;

    props.setTaskItems(itemsCopy);
    props.setUser(userUid);
  };

  const deleteTask = async (id) => {
    let itemsCopy = [...props.taskItems];
    let index = itemsCopy.findIndex((item) => item.id === id);
    itemsCopy.splice(index, 1);
    props.setTaskItems(itemsCopy);
    enqueueSnackbar("Task deleted.", {
      variant: "success",
    });
    await setDoc(
      doc(db, "usersandtasks", userUid),
      { tasks: itemsCopy },
      { merge: true }
    );
  };

  const filtered = (complete) => {
    if (complete === null) {
      setFilteredTask(props.taskItems);
      return;
    }

    let filtered = props.taskItems.filter((item) => {
      return item.isComplete === complete;
    });

    setFilteredTask(filtered);
  };

  useEffect(() => {
    let filtered = props.taskItems.filter((item) => {
      return item.isComplete === true;
    });

    if (filtered.length === 0) {
      document.querySelector(".clearCompBtn").style.display = "none";
    } else {
      document.querySelector(".clearCompBtn").style.display = "inline-block";
    }

    setFilteredTask(props.taskItems);
  }, [props.taskItems]);

  const clearCompleted = () => {
    let filtered = props.taskItems.filter((item) => {
      return item.isComplete === false;
    });

    props.setTaskItems(filtered);
    props.setUser(userUid);
  };

  const filterTask = (task) => {
    return task.id === openDialog[1];
  };

  const search = (items) => {
    return items.filter((item) => {
      if (props.query === "") {
        return item;
      } else {
        return item.text.toLowerCase().includes(props.query);
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
          taskItems={props.taskItems}
          setTaskItems={props.setTaskItems}
          enqueueSnackbar={enqueueSnackbar}
          userUid={userUid}
          setUser={props.setUser}
        />
      )}
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
        sx={{ visibility: props.taskItems.length === 0 ? "hidden" : "visible" }}
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

export default MainWindow;
