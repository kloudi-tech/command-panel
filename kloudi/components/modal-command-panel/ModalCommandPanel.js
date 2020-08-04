import React from "react";

import CommandPalette from "../../../src/command-palette";
import ModalCommandPanelHeader from "./header/ModalCommandPanelHeader";
import ModalCommandPanelTheme from "./ModalCommandPanelTheme";
import QuerySuggestions from "../query-suggestions/QuerySuggestions";

import "./modal-command-panel.css";

import DEFAULT_SUGGESTIONS from "../../data/default-suggestions";
export default function ModalCommandPanel() {
  return (
    <CommandPalette
      alwaysRenderCommands
      /*
       * - If closeOnSelect is false then when the command is selected a loading
       *   indicator comes.
       * - If closeOnSelect is true then when the command is selected then the
       *   suggestions closes
       *  In pop we need to control it with code.
       */
      commands={DEFAULT_SUGGESTIONS}
      header={ModalCommandPanelHeader()}
      // highlightFirstSuggestion={false}
      hotKeys={["command+k", "ctrl+k"]}
      maxDisplayed={100}
      onSelect={(command) => {
        alert(`A suggested command was selected: \n
      ${JSON.stringify(command)}
      `);
      }}
      placeholder="Search"
      renderCommand={QuerySuggestions}
      // showSpinnerOnSelect={false}
      theme={ModalCommandPanelTheme}
    />
  );
}
