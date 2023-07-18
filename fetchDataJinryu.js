import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime, Time } from "https://js.sabae.cc/DateTime.js";

export const fetchDataJinryu = async (iccid) => {
  const data = [];

  // from backup
  const data2 = await CSV.fetchJSON("data/" + iccid + "/all.csv");
  for (const dd of data2) {
    const d = {
      iccid,
      data: dd.n,
      dt: dd.dt.replace("T", " "),
    };
    if (d.dt.startsWith("2023-06-26") && (d.data > 10000000 || d.data == 4000 || d.data == 9981)) {
      d.data = 0;
    }
    data.push(d);
  }
  // from mixserver (today)
  const pass1 = "2uoncrynowwq3g59";
  const pass2 = "SgEivZPNbkrhRLua6";
  const pass = iccid == "8981040000001207740" ? pass1 : pass2;
  const now = new DateTime();
  const dayfirst = new DateTime(now.day, new Time("00:00:00"));
  const dt = Math.floor((now.getTime() - dayfirst.getTime()) / 1000);
  const url = `https://mixsoda.io:2048/${pass}${iccid ? "/" + iccid : ""}.csv?from=-${dt}`;
  console.log("fetchDataJinryu", iccid, url);
  const data3 = await CSV.fetchJSON(url);
  data3.forEach(d => {
    const dt = new DateTime(d.utc * 1000);
    d.dt = dt.toString().substring(0, 19).replace("T", " ");
    //d.dt = dt.toString().substring(0, 10).replace("T", " ");
    delete d.utc;
    d.data = parseInt(d.data, 16);
    if (d.dt.startsWith("2023-06-26") && (d.data > 10000000 || d.data == 4000 || d.data == 9981)) {
      d.data = 0;
    }
    data.push(d);
  });
  return data;
};
