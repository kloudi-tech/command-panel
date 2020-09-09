/* eslint-disable no-alert */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { storiesOf } from "@storybook/react";

// storybook addons
import {
  withKnobs,
  select,
  object,
  number,
  text,
  boolean,
} from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";
import { withOptions } from "@storybook/addon-options";
import { withTests } from "@storybook/addon-jest";

// sample styles
import "../themes/chrome.css";
import "../themes/atom.css";
import "../themes/sublime.css";

// command palette scripts
import lotsOfCommands from "../src/__mocks__/lots_of_commands";
import results from "../.jest-test-results.json";
import ModalCommandPanel from "../kloudi/components/modal-command-panel/ModalCommandPanel";
import InlineCommandPanel from "../kloudi/components/inline-command-panel/InlineCommandPanel";

// add noop command to this big list of command names
function addCommandToArray(c) {
  return c.map((item) => ({
    name: item.name,
    command: Function.prototype,
  }));
}

const proccessedCommands = addCommandToArray(lotsOfCommands);

storiesOf("Kloudi Command Panel", module)
  .addDecorator(
    withOptions({
      name: "Command Palette",
      showPanel: false,
    })
  )
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <div
      style={{
        position: "relative",
        minHeight: "764px",
        minWidth: "428px",
      }}
    >
      {story()}
    </div>
  ))
  .addDecorator(withTests({ results }))
  .addParameters({ jest: ["command-palette.test.js"] })
  .addParameters({
    info: {
      disabled: false,
      inline: false,
      header: false,
    },
  })
  .add("popup config", () => <ModalCommandPanel />)
  .add("homepage config", () => <InlineCommandPanel />);
