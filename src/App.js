import logo from "./survey-logo.png";
import "./App.css";
import React from "react";
import { Button } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import CreateSurvey from "./components/CreateSurvey";
import TakeSurvey from "./components/TakeSurvey";
import { useDispatch } from "react-redux";
import { createSurvey } from "./store/surveySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ConfirmSurvey from "./components/confirm-survey";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const redirectToNewSurvey = () => {
    dispatch(createSurvey())
      .then(unwrapResult)
      .then((newSurveyId) => history.push("/create/" + newSurveyId));
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path="/create/:surveyId">
            <CreateSurvey />
          </Route>
          <Route path="/confirm/:surveyId">
            <ConfirmSurvey />
          </Route>
          <Route path="/take">
            <TakeSurvey />
          </Route>
          <Route path="/">
            <Link to="/create/:surveyId">
              <Button
                className="survey-main-button"
                onClick={redirectToNewSurvey}
              >
                Create Survey
              </Button>
            </Link>
            <Link to="/take">
              <Button className="survey-main-button">Take Survey</Button>
            </Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
