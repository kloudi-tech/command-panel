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
import { withA11y } from "@storybook/addon-a11y";

// sample component
import sampleHeader from "../examples/sampleHeader";
import sampleAtomCommand from "../examples/sampleAtomCommand";
import sampleChromeCommand from "../examples/sampleChromeCommand";
import sampleSublimeCommand from "../examples/sampleSublimeCommand";

// sample styles
import "../themes/chrome.css";
import "../themes/atom.css";
import "../themes/sublime.css";
import chrome from "../themes/chrome-theme";
import atom from "../themes/atom-theme";
import sublime from "../themes/sublime-theme";

// command palette scripts
import CommandPalette from "../src/command-palette";
import commands from "../src/__mocks__/commands";
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

function Trigger() {
  return (
    <button type="button">
      Press &ldquo;<kbd>command/ctrl+k</kbd>&rdquo; to run a command
    </button>
  );
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
  .addDecorator(withA11y)
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
