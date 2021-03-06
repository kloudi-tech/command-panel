import fuzzysort from "fuzzysort";

function getSuggestionHighlights(suggestion) {
  // if there's more than one suggestion, retun an array of
  // highlighted results. ex: ["first *result*", "second *result*"]
  if (Array.isArray(suggestion) && suggestion.length >= 2) {
    return suggestion.map((result) => fuzzysort.highlight(result));
  }
  // otherwise return the single suggestion as a string. ex:
  // "only *result*"
  return fuzzysort.highlight(suggestion[0]);
}

// format the output to include a code higlight for innerHTML
// and the command to invoke
function formatSuggestions(filteredSuggestions, value) {
  filteredSuggestions = filteredSuggestions.map((suggestion) => {
    const opts = {
      name: suggestion.obj.name,
      command: suggestion.obj.command,
      highlight: getSuggestionHighlights(suggestion),
    };
    return { ...opts, ...suggestion.obj };
  });
  if (filteredSuggestions.filter((i) => i.name === value).length <= 0)
    filteredSuggestions.push({
      id: filteredSuggestions.length,
      mode: "INPUT_SEARCH",
      name: value,
      command() {},
    });
  return filteredSuggestions;
}

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = function (value, allCommands, options) {
  // TODO: preparing fuzzysort results make them much faster
  // however prepare is expensiveand should only be run when
  // the commands change lodash.once get close to this
  // but the implementation needs to work within the react lifecyle
  // lets come back to this later, ex:
  // once(() => {
  //   allCommands.forEach(s => (s.namePrepared = fuzzysort.prepare(s.name)));
  // });

  // If the user specified an autosuggest term
  // search for close matches
  const suggestionResults = fuzzysort.go(value, allCommands, options);

  // if the user didnt suggest a specific term or there's a search term
  // but no matches were found return all the commands
  if (value.length > 0 && suggestionResults.length <= 0)
    return [
      {
        id: 1,
        mode: "INPUT_SEARCH",
        name: value,
        command() {},
      },
    ];
  else if (!value || !suggestionResults.length) return allCommands;

  // Otherwise return the search results
  return formatSuggestions(suggestionResults, value);
};

export default getSuggestions;
