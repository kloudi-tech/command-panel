import React from "react";

import logo from "../../../images/logo.svg";

import "./modal-command-panel-header.css";

export default function ModalCommandPanelHeader() {
  return (
    <div className={`wrapper`}>
      <object className="logo" type="image/svg+xml" data={logo} />
      <span className="item">{`Command Panel`}</span>
    </div>
  );
}
