export default [
  {
    id: 1,
    mode: "SEARCH",
    name: "Mark as done",
    command() {},
  },
  {
    id: 2,
    name: "View breadcrumbs",
    mode: "SEARCH",
    command() {},
  },
  {
    id: 2,
    name: "Assign to",
    mode: "SEARCH",
    command() {},
  },
  {
    id: 3,
    name: "Mark as released",
    mode: "SEARCH",
    command() {},
  },
  {
    id: 4,
    name: "Mark as Done",
    mode: "QUICK_SEARCH",
    shortcut: ["M", "D"],
    command() {},
  },
  {
    id: 4,
    name: "Mark as Released",
    mode: "QUICK_SEARCH",
    shortcut: ["M", "R"],
    command() {},
  },
  {
    id: 4,
    name: "Mark as ",
    mode: "QUICK_SEARCH",
    shortcut: ["M"],
    command() {},
  },
];
