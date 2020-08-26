const QUICK_SEARCH_COMBO_TO_TEXT_DICT = require("../data/modal/modes/quick-search/default-combo-to-text-dict.json");

export default class QuickSearch {
  static getTextForKeyCombinations = (combo) => {
    const item = QUICK_SEARCH_COMBO_TO_TEXT_DICT.find(
      (item) => item.key === combo
    );
    if (!item) return "";
    else return item.value;
  };
}
