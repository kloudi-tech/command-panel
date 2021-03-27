// For implementation notes refer to hooks/useAsync
/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";

import remoteSource from "../data/remote/RemoteSource";

import UrlUtil from "../common/UrlUtil";

export const useSubmitQuery = (props) => {
  const submit = async function (payload) {
    const data = await remoteSource.submitQueryForHook(payload);
    return { ...data, to: data.navigateTo };
  };
  const { immediate } = props;
  const defaultPayload = props.payload;

  const [status, setStatus] = useState("IDLE");
  const [data, setData] = useState({ cards: [] });
  const [error, setError] = useState(undefined);
  const [query, setQuery] = useState(
    defaultPayload && defaultPayload.q ? defaultPayload.q : undefined
  );

  const execute = useCallback((callbackPayload) => {
    // TODO: First we use the payload that we had at the time of initialization
    // then we update it with the callback payload. Advantage of this method is
    // we don't need to add context every time.

    const newPayload = { ...defaultPayload, ...callbackPayload };
    setStatus("PENDING");
    const cachedData = JSON.parse(window.sessionStorage.getItem(newPayload.q));
    if (
      cachedData !== null &&
      cachedData !== undefined &&
      Object.keys(cachedData).length > 0
    ) {
      const to = cachedData.navigateTo,
        query = cachedData.query.text;
      const url = UrlUtil.getCompleteURLFromQueryData(to, query);
      if (url.redirect.state !== "INTERNAL-QUERY-SUBMITTED-REDIRECT") {
        // Adding this check because while performing update queries we can't
        // send cached data.
        setData(cachedData);
        setStatus("STALE-WHILE-REVALIDATE");
      }
    }
    setError(undefined);
    setQuery(newPayload.q);

    return submit(newPayload)
      .then((response) => {
        setData(response);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        setData({
          cards: [],
          navigateTo: "query/submit/",
          query: { response: error.message, text: payload.q },
          status: error.response.status,
        });
        setError(error);
        setStatus("ERROR");
      });
  });

  useEffect(() => {
    if (immediate) execute();
  }, [immediate]);

  return { execute, status, data, error, query };
};
