import React, { useState } from "react";

import CommandPalette from "../../command-pallete";
import ModalCommandPanelHeader from "./header/ModalCommandPanelHeader";
import ModalCommandPanelTheme from "./ModalCommandPanelTheme";
import QuerySuggestions from "../query-suggestions/QuerySuggestions";

import "./modal-command-panel.css";

import DEFAULT_SUGGESTIONS from "../../data/modal/default-suggestions";
import DEFAULT_HOTKEYS from "../../data/modal/default-hotkeys.json";
import DEFAULT_GIT_MODE_HOTKEYS from "../../data/modal/modes/git/default-hotkeys.json";
import DEFAULT_QUICK_SEARCH_HOTKEYS from "../../data/modal/modes/quick-search/default-hotkeys.json";

export default function ModalCommandPanel(props) {
  const [commands, setCommands] = useState(
    DEFAULT_SUGGESTIONS.filter(
      (item) => ["SEARCH", "MODE"].indexOf(item.mode) >= 0
    )
  );
  const [hotkeys, setHotkeys] = useState(DEFAULT_HOTKEYS);
  const [mode, setMode] = useState("SEARCH");

  const handleCommandPanelModeChaned = (mode, prevMode) => {
    setMode(mode);
    setCommands(
      DEFAULT_SUGGESTIONS.filter((item) => {
        if (!mode) return item;
        else if (item.mode === mode) return item;
      })
    );
    if (mode === "QUICK_SEARCH") setHotkeys(DEFAULT_QUICK_SEARCH_HOTKEYS);
    else if (mode === "GIT") setHotkeys(DEFAULT_GIT_MODE_HOTKEYS);
    else setHotkeys(DEFAULT_HOTKEYS);
  };

  const dummyOnSelect = (command) => {
    console.log(JSON.stringify(command));
  };

  return (
    <CommandPalette
      commands={commands}
      closeOnSelect={false}
      header={ModalCommandPanelHeader(mode)}
      highlightFirstSuggestion
      hotKeys={hotkeys}
      maxDisplayed={100}
      mode={mode}
      onCommandPanelModeChanged={handleCommandPanelModeChaned}
      onSelect={props.onSelect || dummyOnSelect}
      placeholder="Type your query"
      renderCommand={QuerySuggestions}
      resetInputOnClose
      showSpinnerOnSelect={true}
      theme={ModalCommandPanelTheme}
    />
  );
}
