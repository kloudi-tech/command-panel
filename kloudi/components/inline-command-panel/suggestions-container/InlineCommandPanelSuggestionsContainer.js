import React from "react";

import logo from "../../../images/logo.svg";

import "./inline-command-panel-suggestions-container.css";

export default function InlineCommandPanelSuggestionsContainer({
  containerProps,
  children,
  query,
}) {
  return (
    <div className={`suggestions-container-wrapper`} {...containerProps}>
      <div className="suggestions-container-header">
        <object
          className="suggestions-container-logo"
          type="image/svg+xml"
          data={logo}
        />
        <div className="suggestions-container-item">{`Recent Searches / Suggestions`}</div>
      </div>
      {children}
    </div>
  );
}
