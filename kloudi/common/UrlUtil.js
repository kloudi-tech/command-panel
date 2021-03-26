/* eslint-disable no-param-reassign */
export default class UrlUtil {
  static getCompleteURLFromQueryData(to, query = "") {
    query = encodeURIComponent(query);
    let url;
    try {
      url = new URL(to);
    } catch (err) {
      const pathname = `/${to.split(`?`)[0]}?q=${query}`;
      url = new URL(`${window.location.origin}${pathname}`);
    } finally {
      /*
       * Here we create a state map in case we want to perform a redirection
       * w.r.t to the current location.
       */
      if (url.pathname === "/query/submit/") {
        url.redirect = {
          state: "INTERNAL-QUERY-SUBMITTED-REDIRECT",
        };
      } else if (url.pathname === "/query/form/") {
        url.redirect = {
          state: "INTERNAL-QUERY-FORM-REDIRECT",
        };
      } else if (url.origin !== window.location.origin) {
        /*
         * Case #1.0: Platform is redirecting user out of Kloudi.
         */
        url.redirect = { state: "EXTERNAL-REDIRECT" };
      } else if (
        url.pathname === window.location.pathname &&
        url.search !== window.location.search
      ) {
        url.redirect = {
          state: "INTERNAL-SAME-ENTITY-DIFFERENT-QUERY-REDIRECT",
        };
      } else if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        url.redirect = { state: "NO-REDIRECT" };
      } else if (url.pathname !== window.location.pathname) {
        const currentURLSegments = window.location.pathname
          .replace(/(^\/+|\/+$)/g, "")
          .split("/");
        const redirectURLSegments = url.pathname
          .replace(/(^\/+|\/+$)/g, "")
          .split("/");
        if (
          currentURLSegments.length >= 4 &&
          redirectURLSegments.length >= 4 &&
          currentURLSegments[0] === redirectURLSegments[0] /* Same Project */ &&
          currentURLSegments[1] ===
            redirectURLSegments[1] /* Same Project ID */ &&
          currentURLSegments[2] === redirectURLSegments[2] /* Same Entity */ &&
          currentURLSegments[3] !== redirectURLSegments[3]
        ) {
          url.redirect = {
            state: "INTERNAL-SAME-ENTITY-DIFFERENT-ID-REDIRECT",
          };
        } else url.redirect = { state: "INTERNAL-DIFFERENT-ENTITY-REDIRECT" };
      } else url.redirect = { state: "NO-REDIRECT" };

      // eslint-disable-next-line no-unsafe-finally
      return url;
    }
  }
}
