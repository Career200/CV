const GOATCOUNTER_ENDPOINT = "https://dzh.goatcounter.com/count";

export const initAnalytics = () => {
  if (!import.meta.env.PROD) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "//gc.zgo.at/count.js";
  script.dataset.goatcounter = GOATCOUNTER_ENDPOINT;
  document.head.appendChild(script);
};
