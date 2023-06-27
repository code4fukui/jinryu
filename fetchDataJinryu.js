import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

export const fetchDataJinryu = async () => {
  const url = "https://mixsoda.io:2048/2uoncrynowwq3g59.csv?from=600000";
  const data = await CSV.fetchJSON(url);
  data.forEach(d => {
    const dt = new DateTime(d.utc * 1000);
    d.dt = dt.toString().substring(0, 19).replace("T", " ");
    //d.dt = dt.toString().substring(0, 10).replace("T", " ");
    delete d.utc;
    d.data = parseInt(d.data, 16);
    if (d.dt.startsWith("2023-06-26") && (d.data > 10000000 || d.data == 4000 || d.data == 9981)) {
      d.data = 0;
    }
  });
  return data;
};
