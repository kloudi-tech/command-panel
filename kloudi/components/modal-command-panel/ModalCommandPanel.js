/* eslint-disable */
import React, { useEffect, useState } from "react";

import { useSubmitQuery } from "../../hooks/useSubmitQuery";

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
  const { suggestions } = props;

  const [commands, setCommands] = useState(
    DEFAULT_SUGGESTIONS.filter((i) => ["SEARCH", "MODE"].indexOf(i.mode) >= 0)
  );
  const [hotkeys, setHotkeys] = useState(DEFAULT_HOTKEYS);
  const [mode, setMode] = useState("SEARCH");
  const [open, setOpen] = useState(props.open || false);
  const [view, setView] = useState(
    <CommandPalette
      commands={commands}
      header={ModalCommandPanelHeader(mode)}
      hotKeys={hotkeys}
      mode={mode}
      onCommandPanelModeChanged={handleOnModalCommandPanelModeChaned}
      open={open}
      onSelect={handleOnSelect}
      renderCommand={QuerySuggestions}
      theme={ModalCommandPanelTheme}
      trigger={<img src={logo} alt="kloudi" />}
    />
  );
  const { execute, status, data, error, query } = useSubmitQuery({
    payload: props.defaultPayload,
  });
  const [response, setResponse] = useState(data);

  function handleOnAfterCommandPanelModalOpen() {
    if (process.env.PLATFORM === "MAC-APP" && window.require) {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("HIDE-OPENED-EXTERNAL-LINK-PREVIEW-WINDOW");
    }
  }

  function handleOnModalCommandPanelModeChaned(mode, prevMode) {
    /*
     * Step #1: Update the current mode
     */
    setMode(mode);

    /*
     * Step #2: Update the hotKeys based on the new mode.
     */
    if (mode === "QUICK_SEARCH") setHotkeys(DEFAULT_QUICK_SEARCH_HOTKEYS);
    else if (mode === "GIT") setHotkeys(DEFAULT_GIT_MODE_HOTKEYS);
    else setHotkeys(DEFAULT_HOTKEYS);

    /*
     * Step #3: Update the commands based on the new mode.
     */
    setCommands(
      DEFAULT_SUGGESTIONS.filter((item) => {
        if (!mode) return item;
        else if (item.mode === mode) return item;
      })
    );
  }

  function handleOnRequestCommandPanelModalClose() {
    if (process.env.PLATFORM === "MAC-APP" && window.require) {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("SHOW-OPENED-EXTERNAL-LINK-PREVIEW-WINDOW");
    }
  }

  function handleOnSelect(command) {
    const query = command.name;
    setOpen(true);
    execute({ q: query });
  }

  useEffect(() => {
    if (["SUCCESS", "ERROR", "STALE-WHILE-REVALIDATE"].indexOf(status) >= 0) {
      setOpen(false);
      if (
        response &&
        Object.keys(response).length > 0 &&
        response.cards &&
        Object.keys(response.cards).length > 0 &&
        data &&
        Object.keys(data).length > 0 &&
        data.cards &&
        Object.keys(data.cards).length > 0 &&
        JSON.stringify(response.cards) !== JSON.stringify(data.cards)
      )
        setResponse(response);
      if (props.handleCommandSubmitted)
        props.handleCommandSubmitted(data, query, status);
    }
  }, [data, status]);

  useEffect(() => {
    let data = props.suggestions || [];
    data = data.filter((item) => !!item && item.length > 0);
    data = data.filter((value, index) => data.indexOf(value) === index);
    data = data
      .map((item, i) => ({
        id: commands.length + i,
        name: item,
        mode: mode,
        command() {},
      }))
      .concat(commands);
    if (props.suggestions && props.suggestions.length > 0) setCommands(data);
  }, [props.suggestions]);

  useEffect(() => {
    setOpen(props.open || false);
  }, [props.open]);

  useEffect(() => {
    setView(
      <CommandPalette
        commands={commands}
        header={ModalCommandPanelHeader(mode)}
        hotKeys={hotkeys}
        mode={mode}
        onAfterOpen={handleOnAfterCommandPanelModalOpen}
        onCommandPanelModeChanged={handleOnModalCommandPanelModeChaned}
        open={open}
        onRequestClose={handleOnRequestCommandPanelModalClose}
        onSelect={handleOnSelect}
        renderCommand={QuerySuggestions}
        theme={ModalCommandPanelTheme}
        trigger={<img src={logo} alt="kloudi" />}
      />
    );
  }, [commands, hotkeys, mode, open]);

  return view;
}
