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
    <div className={`header-wrapper`}>
      <span className="header-item">
        <span className="header-mode">{getModeName(mode)}</span>
        {` on COMMAND PANEL`}
      </span>
      <object className="header-logo" type="image/svg+xml" data={logo} />
    </div>
  );
}
