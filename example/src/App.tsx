import React from "react";
import logo from "./core/laika-logo-white.svg";
import "./App.css";
import { LaikaChatGPT } from "laika-ti-chatgpt-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Laika ChatGPT" />
        <p>Laika ChatGPT Development.</p>
        <a
          className="App-link"
          href="https://laika.com.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Laika
        </a>
      </header>
      <LaikaChatGPT
        host={"http://localhost:4001"}
        user={{
          id: 1493161,
          avatar: "",
          email: "villanueva.danielx@gmail.com",
          fullname: "Daniel Villanueva",
          tokenAuth:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMyIsImp0aSI6IjM4M2U3ZDY2ZWQ5MmViZmEyYTU0YjljZTgwNmU3ZTg3MDFhYWJlYWU2ZGI3NzRlYzNmMzg5MjZlZWRlODZhYzQ2OWE4ZWJiYjlmZjE3Y2U3IiwiaWF0IjoxNjg3MTQ2OTA3LCJuYmYiOjE2ODcxNDY5MDcsImV4cCI6MzI2NTA3MDEwNywic3ViIjoiMTQ5MzE2MSIsInNjb3BlcyI6W119.p04am0-a3rae5K9KlUaKG_4_eO_XTIun4OMO5woL9xtDovpN2fcbuynj009GDUEGpoTX0eLJeyzfc0NX8OoE6nWSe1XsShmODSOil7kz0fch6_YkcYKzsjn0azaUrJMtJJawY28m3gV6Bs2SfAakSYQ8hZqtCQ_9SQjEiYxVwRSxSAO8kL0U5SI-G4edZFoG3IeGFjP-5NB7ekSaqboz5D35IZXxK28WKNYF-D18EeIHvDi7HDMX7Osvf2JGmp3UkuM1zOW7FXqAwwQ9rwdV7D0eFSrldSSBVPv2dBDWmHrOexhBIkFCMVWV4bR7zVQJ4kF0wbZ20YkcnEnMOUV89wI5lzUnZ65iYjrKQGLdqJYtdu0QY7c1BB7V0fBdTo0MGP0QvIGvywM9OtC84JQ0KuTDKB7FFt393GjQAu6r1f8m7cTFGL_lgPZ5-DPwhNm4Z4sHuIJ4RZbxzk_rcBc4RGZco1WECaGT5FdzihSBXCS0QY_m-Y8JB-TdU78YPaQP7i8Zz0NctIb8ja1scF1O83R6d5l64R9ixskbmwlxEazIFn2bdFbqW9JOjjqFGRAljHvLuecRJB4zPJLLKLmZdqnhdWtdI48mVE_w-fz0ZBgmxjDHeEprWM90qWtuXTQ_NU8lcrtYUkDaLiSoCdf11GgJg5Av2LI-dVaqJGigREg",
          userId: 1493161,
          socketId: "",
        }}
      />
    </div>
  );
}

export default App;
