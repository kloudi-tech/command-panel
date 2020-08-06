import React, { useState } from "react";

import CommandPalette from "../../../src/command-palette";
import ModalCommandPanelHeader from "./header/ModalCommandPanelHeader";
import ModalCommandPanelTheme from "./ModalCommandPanelTheme";
import QuerySuggestions from "../query-suggestions/QuerySuggestions";

import "./modal-command-panel.css";

import DEFAULT_SUGGESTIONS from "../../data/default-suggestions";
export default function ModalCommandPanel(props) {
  const [closeOnSelect, setCloseOnSelect] = useState(
    props.closeOnSelect || false
  );
  const [showSpinnerOnSelect, setShowSpinnerOnSelect] = useState(
    props.showSpinnerOnSelect || false
  );

  return (
    <CommandPalette
      commands={DEFAULT_SUGGESTIONS}
      closeOnSelect={closeOnSelect}
      header={ModalCommandPanelHeader()}
      highlightFirstSuggestion
      hotKeys={["command+k", "ctrl+k"]}
      maxDisplayed={100}
      onSelect={(command) => {
        alert(`A suggested command was selected: \n
      ${JSON.stringify(command)}
      `);
      }}
      placeholder="Search"
      renderCommand={QuerySuggestions}
      showSpinnerOnSelect={showSpinnerOnSelect}
      theme={ModalCommandPanelTheme}
    />
  );
}
