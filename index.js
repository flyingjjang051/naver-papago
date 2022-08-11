const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const app = express();

app.set("port", process.env.PORT || 8099);
const port = app.get("port");
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("hello express");
});
app.get("/papago", (req, res) => {
  axios({
    url: "https://openapi.naver.com/v1/papago/n2mt",
    method: "POST",
    params: {
      source: "ko",
      target: "en",
      text: "김정은 북한 국무위원장이 코로나19 위기가 완전히 해소됐다고 선언한 가운데, 김정은의 동생인 김여정 노동당 부부장은 코로나19 바이러스가 남측으로부터 북한에 유입됐다고 주장했다. 그러면서 김여정은 “우리는 반드시 강력한 대응을 해야 한다”고 했다",
    },
    headers: {
      "X-Naver-Client-Id": "5vUtAmLfmqV7l_2Q4E2p",
      "X-Naver-Client-Secret": "Oq5AQ8LPzt",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  }).then((response) => {
    console.log(response.data.message.result.translatedText);
  });
});
app.listen(port, () => {
  console.log(`${port}번에서 서버 대기중`);
});
