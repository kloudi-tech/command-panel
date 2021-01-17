// For implementation notes refer to hooks/useAsync
/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";

import remoteSource from "../data/remote/RemoteSource";

export const useSubmitQuery = (props) => {
  const submit = async function (payload) {
    const data = await remoteSource.submitQueryForHook(payload);
    return { ...data, to: data.navigateTo };
  };
  const { immediate } = props;
  const defaultPayload = props.payload;

  const [status, setStatus] = useState("IDLE");
  const [data, setData] = useState([]);
  const [error, setError] = useState(undefined);

  const execute = useCallback((callbackPayload) => {
    // TODO: First we use the payload that we had at the time of initialization
    // then we update it with the callback payload. Advantage of this method is
    // we don't need to add context every time.

    const newPayload = { ...defaultPayload, ...callbackPayload };
    setStatus("PENDING");
    setData([]);
    setError(undefined);

    return submit(newPayload)
      .then((response) => {
        setData(response);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        setError(error);
        setStatus("ERROR");
      });
  });

  useEffect(() => {
    if (immediate) execute();
  }, [immediate]);

  return { execute, status, data, error };
};
