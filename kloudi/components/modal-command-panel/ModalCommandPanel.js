import React, { useEffect, useState } from "react";

import CommandPalette from "../../command-pallete";
import ModalCommandPanelHeader from "./header/ModalCommandPanelHeader";
import ModalCommandPanelTheme from "./ModalCommandPanelTheme";
import QuerySuggestions from "../query-suggestions/QuerySuggestions";

import logo from "../../images/logo-solid.svg";

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
    alert(JSON.stringify(command));
  };

  useEffect(() => {
    if (props.suggestions && props.suggestions.length > 0)
      setCommands([
        ...props.suggestions.map((i, item) => ({
          id: commands.length + i,
          name: item,
          mode: mode,
          command() {},
        })),
        ...commands,
      ]);
  }, [props.suggestions]);

  return (
    <CommandPalette
      commands={commands}
      closeOnSelect={true}
      header={ModalCommandPanelHeader(mode)}
      highlightFirstSuggestion
      hotKeys={hotkeys}
      maxDisplayed={100}
      mode={mode}
      trigger={<img src={logo} />}
      onCommandPanelModeChanged={handleCommandPanelModeChaned}
      onSelect={(command) => {
        if (props.onSelect) props.onSelect(command.name);
        else dummyOnSelect(command);
      }}
      placeholder="Type your query"
      renderCommand={QuerySuggestions}
      resetInputOnClose
      theme={ModalCommandPanelTheme}
    />
  );
}
