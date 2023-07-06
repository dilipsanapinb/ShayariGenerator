const express = require("express");
const {Configuration,OpenAIApi } = require("openai");
const axios = require("axios");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const configuration = new Configuration({
  apiKey : process.env.YOUR_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("working")
})



app.get("/generate-shayari", async (req, res) => {
  try {
    const word = req.query.word; // Retrieve the word from the query parameter
    console.log(word);
    if (!word) {
      return res.send({ message: "No word was provided" });
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `generate the shayari of using the word ${word} in hindi`,
      max_tokens: 1000,
    });
    console.log(response.data.choices[0].text);
    res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log(error.response.status);
      console.log(error.response.data);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const port = 8000; // You can change this to your desired port number
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
