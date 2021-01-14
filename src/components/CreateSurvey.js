import React, { useState, useEffect } from "react";
import SingleSelect from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useParams, useLocation, useHistory } from "react-router-dom";

export default function CreateSurvey() {
  const { surveyId } = useParams();
  const query = useLocation().search;
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownText, setDropdownText] = useState("Select Question Type");

  useEffect(() => {
    if (query === "?clear=true") {
      setDropdownText("Select Question Type");
      history.push("/create/" + surveyId);
    }
  }, [query, history, surveyId]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle className="survey-toggle-button w-100" caret>
          {dropdownText}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => setDropdownText("Single Select Question")}
          >
            Single Select Question
          </DropdownItem>
          <DropdownItem
            onClick={() => setDropdownText("Multi Select Question")}
          >
            Multi Select Question
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {dropdownText === "Single Select Question" ? <SingleSelect /> : null}
      {dropdownText === "Multi Select Question" ? <MultiSelect /> : null}
    </>
  );
}
