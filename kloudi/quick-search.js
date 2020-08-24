const COMBO_TO_TEXT_DICT = require("./data/default-combo-to-text-dict.json");

const getTextForKeyCombinations = function (combo) {
  const item = COMBO_TO_TEXT_DICT.find((item) => item.key === combo);
  if (!item) return "";
  else return item.value;
};

export default getTextForKeyCombinations;
