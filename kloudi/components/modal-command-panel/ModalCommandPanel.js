import React, { useState } from "react";

import CommandPalette from "../../../src/command-palette";
import ModalCommandPanelHeader from "./header/ModalCommandPanelHeader";
import ModalCommandPanelTheme from "./ModalCommandPanelTheme";
import QuerySuggestions from "../query-suggestions/QuerySuggestions";

import "./modal-command-panel.css";

import DEFAULT_SUGGESTIONS from "../../data/default-suggestions";
import DEFAULT_HOTKEYS from "../../data/default-modal-hotkeys";

export default function ModalCommandPanel(props) {
  const [commands, setCommands] = useState(
    DEFAULT_SUGGESTIONS.filter((item) => item.mode === "SEARCH")
  );
  const [closeOnSelect, setCloseOnSelect] = useState(
    props.closeOnSelect || false
  );
  const [mode, setMode] = useState("SEARCH");
  const [showSpinnerOnSelect, setShowSpinnerOnSelect] = useState(
    props.showSpinnerOnSelect || false
  );

  const handleCommandPanelModeChaned = (mode, prevMode) => {
    if (prevMode !== "SEARCH" && mode === "SEARCH") return;
    else
      setCommands(
        DEFAULT_SUGGESTIONS.filter((item) => {
          if (!mode) return item;
          else if (item.mode === mode) return item;
        })
      );

    setMode(mode);
  };

  return (
    <CommandPalette
      commands={commands}
      closeOnSelect={closeOnSelect}
      header={ModalCommandPanelHeader(mode)}
      highlightFirstSuggestion
      hotKeys={DEFAULT_HOTKEYS}
      maxDisplayed={100}
      mode={mode}
      onCommandPanelModeChanged={handleCommandPanelModeChaned}
      onSelect={(command) => {
        alert(`A suggested command was selected: \n
      ${JSON.stringify(command)}
      `);
      }}
      placeholder="Type your query"
      renderCommand={QuerySuggestions}
      showSpinnerOnSelect={showSpinnerOnSelect}
      theme={ModalCommandPanelTheme}
    />
  );
}
