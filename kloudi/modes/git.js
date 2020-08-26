const GIT_COMBO_TO_TEXT_DICT = require("../data/modal/modes/git/default-combo-to-text-dict.json");

export default class GitSearch {
  static getTextForKeyCombinations = (combo) => {
    const item = GIT_COMBO_TO_TEXT_DICT.find((item) => item.key === combo);
    if (!item) return "";
    else return item.value;
  };
}
