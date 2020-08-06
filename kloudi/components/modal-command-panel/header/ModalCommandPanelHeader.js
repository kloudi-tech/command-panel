import React from "react";

import logo from "../../../images/logo.svg";

import "./modal-command-panel-header.css";

export default function ModalCommandPanelHeader() {
  return (
    <div className={`header-wrapper`}>
      <object className="header-logo" type="image/svg+xml" data={logo} />
      <span className="header-item">{`Command Panel`}</span>
    </div>
  );
}
