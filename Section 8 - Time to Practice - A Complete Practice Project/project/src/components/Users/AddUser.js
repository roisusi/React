import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
import classes from "./AddUser.module.css";
import { useState } from "react";

const AddUser = (props) => {
  const [enterdUsername, setEnterdUsername] = useState("");
  const [enterdAge, setEnterdAge] = useState("");
  const [error, setError] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(enterdUsername.trim().length);
    if (enterdUsername.trim().length === 0 || enterdAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      return;
    }
    if (+enterdAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0)",
      });
      return;
    }
    props.onAddUser(enterdUsername, enterdAge);
    setEnterdUsername("");
    setEnterdAge("");
  };

  const userNameChangeHandler = (event) => {
    setEnterdUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnterdAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModel
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={enterdUsername}
            onChange={userNameChangeHandler}
          />
          <label htmlFor="age">Age (Year)</label>
          <input
            type="number"
            id="age"
            value={enterdAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
