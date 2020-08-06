import React, { useState } from "react";

import CommandPalette from "../../../src/command-palette";
import InlineCommandPanelSuggestionsContainer from "./suggestions-container/InlineCommandPanelSuggestionsContainer";
import InlineCommandPanelTheme from "./InlineCommandPanelTheme";
import InlineQuerySuggestions from "../inline-query-suggestions/InlineQuerySuggestions";

import "./inline-command-panel.css";

import DEFAULT_SUGGESTIONS from "../../data/default-suggestions";
export default function InlineCommandPanel(props) {
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
      display={"inline"}
      highlightFirstSuggestion
      hotKeys={["command+k", "ctrl+k"]}
      maxDisplayed={100}
      onSelect={(command) => {
        alert(`A suggested command was selected: \n
      ${JSON.stringify(command)}
      `);
      }}
      placeholder="Search"
      renderCommand={InlineQuerySuggestions}
      renderSuggestionsContainer={InlineCommandPanelSuggestionsContainer}
      showSpinnerOnSelect={showSpinnerOnSelect}
      theme={InlineCommandPanelTheme}
    />
  );
}
