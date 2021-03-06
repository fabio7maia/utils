// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";

type Data = {
  url: string;
  username: string;
  password: string;
  type: string;
  output: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const itpvResponse = await fetch("https://test.alltvfans.com/product4.html");
  const html = await itpvResponse.text();

  const $ = cheerio.load(html);

  const nodes: any = $(
    "div[class=box-info3] > div[class=lower-box] > button[data-clipboard-text*=http]"
  );

  let url;

  for (let node of nodes) {
    url = $(node).attr("data-clipboard-text");

    if (url && url.indexOf("http") >= 0 && url.indexOf("username") > 0) {
      break;
    }
  }

  url = url || "";

  //   const urlParams = new URL(url).searchParams;

  //   const username = urlParams.get("username") || "";
  //   const password = urlParams.get("password") || "";
  //   const type = urlParams.get("type") || "";
  //   const output = urlParams.get("output") || "";

  //   const iptvChannels = await fetch(url);

  console.log("api/iptv response", { url });

  //   res.status(200).json({ url, username, password, type, output });

  res.writeHead(302, {
    // or 301
    Location: url,
  });
  res.end();
}
