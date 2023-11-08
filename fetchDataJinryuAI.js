import { CSV } from "https://js.sabae.cc/CSV.js";
import { DateTime, Time } from "https://js.sabae.cc/DateTime.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

export const fetchDataJinryuAI = async (iccid) => {
  const data = [];

  const pass = "SgEivZPNbkrhRLua6";
  const now = new DateTime();
  const dayfirst = new DateTime(now.day, new Time("00:00:00"));
  const dt = Math.floor((now.getTime() - dayfirst.getTime()) / 1000);
  const url = `https://mixsoda.io:2048/${pass}${iccid ? "/" + iccid : ""}.csv?from=-${dt}`;
  console.log("fetchDataJinryuAI", iccid, url);
  const data3 = await CSV.fetchJSON(url);
  data3.forEach(d => {
    const dt = new DateTime(d.utc * 1000);
    d.dt = dt.toString().substring(0, 19).replace("T", " ");
    //d.dt = dt.toString().substring(0, 10).replace("T", " ");
    delete d.utc;
    const array = new Int16Array(Base16.decode(d.data).buffer);
    d.array = array;
    d.data = array.reduce((pre, n) => pre + n, 0);
    data.push(d);
  });
  return data;
};
