import  express from "express";
import cors from "cors";
import axios from "axios";


const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://demo.techleara.net/api/v2/authentication/oauth2/token?db=network",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error in proxy:", err.message);
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Something went wrong" });
  }
});

app.listen(3001, () => {
  console.log("✅ Proxy running at http://localhost:3001");
});
