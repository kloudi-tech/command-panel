import Axios from "axios";

import keyStore from "../store/KeyValStore";
import stateStore from "../store/StateStore";

const BASE_URL = process.env.GATSBY_API_URL;

function getAuthToken() {
  if (process.env.PLATFORM === "VSCODE") {
    return stateStore.get("KLOUDI_AUTH_TOKEN");
  }
  return (
    keyStore.get("KLOUDI_AUTH_TOKEN") || stateStore.get("KLOUDI_AUTH_TOKEN")
  );
}

function getError(message, status) {
  const err = new Error();
  err.message = message || "Oops! Something unexpected happened";
  err.status = status || 500;
  return err;
}
function isError(res) {
  return res.status >= 400 || res.data.status >= 400;
}

function parseResponse(res) {
  if (isError(res)) {
    throw getError(res.data.status, res.data.message);
  } else {
    return res.data.data;
  }
}

class RemoteSource {
  async submitQueryForHook(payload) {
    const baseUrl = BASE_URL;
    const endPoint = `/assistant/submit/`;
    const url = baseUrl + endPoint;
    const res = await Axios.post(url, payload, {
      headers: { Authorization: getAuthToken() },
    });
    return parseResponse(res);
  }
}

export default new RemoteSource();
