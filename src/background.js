chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const apiPathRegex = /^(https?:\/\/crystal-lang.org\/api)\/([^\/]+)\/(.*)/;

    // Hard-coding for now since looking up the latest GitHub release over the API was a bit slow.
    const latestVersion = "1.0.0";

    const requestedVersion = details.url.replace(apiPathRegex, "$2");
    if (requestedVersion === latestVersion) {
      return;
    }

    const newUrl = details.url.replace(apiPathRegex, `$1/${latestVersion}/$3`);

    return {
      redirectUrl: newUrl,
    };
  },
  {
    urls: ["*://crystal-lang.org/api/*"],
    types: [
      "main_frame",
      "sub_frame",
      "stylesheet",
      "script",
      "image",
      "object",
      "xmlhttprequest",
      "other",
    ],
  },
  ["blocking"]
);
