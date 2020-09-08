import React from "react";

import logo from "../../../images/logo.svg";

import "./modal-command-panel-header.css";

function getModeName(mode) {
  switch (mode) {
    case "QUICK_SEARCH":
      return "Quick Search";
    case "GIT":
      return "Git Mode";
    default:
      return "Search";
  }
}
export default function ModalCommandPanelHeader(mode) {
  return (
    <div className={`command-panel-header-wrapper`}>
      <span className="command-panel-header-item">
        <span className="command-panel-header-mode">{getModeName(mode)}</span>
        {` on COMMAND PANEL`}
      </span>
      <object
        className="command-panel-header-logo"
        type="image/svg+xml"
        data={logo}
      />
    </div>
  );
}
