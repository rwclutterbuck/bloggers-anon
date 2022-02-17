// Determine user fingerprint on browser load
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const fpPromise = import("https://openfpcdn.io/fingerprintjs/v3").then(
    (FingerprintJS) => FingerprintJS.load()
  );
  fpPromise
    .then((fp) => fp.get())
    .then(async (result) => {
      const visitorId = result.visitorId;
      console.log(visitorId);
      const access = await fingerprintChecker(visitorId);
      console.log("Access: " + access);
      // access ? "___" : "___"
    })
    .catch((error) => console.error(error));
});

async function fingerprintChecker(print) {
  const data = {
    hash: print,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const result = await (
    await fetch("http://localhost:3000/fingerprint", options)
  ).json();
  return result.access;
}
