'use client';

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { Message } from "./message";
import Loader from "./loader";
import Header from "./header";
import QueryForm from "./form/queryForm";

const API_KEY = 'AIzaSyB2todRABn_3D_YIGqZAxQYJpp4nSv6Eu4';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        { text: "Olá!" },
        { text: "Olá você será um Assistente Fitness que ajudara as pessoas com dicas de saude e exercicio e respondera suas duvidas sobre esses assuntos. Você resoponderá de forma simples, clara e objetiva sem muita enrolação." },
        {
          text: "Você será um assitente fitness, portanto qualquer outro tema que o usuario tenha que não seja do seu escopo você não saberá resposta e irá pedir para que a pessoa volte a falar sobre fitness, academia, saude entre outros do genero."
        }
      ],
    },
    {
      role: "model",
      parts: [
        { text: "Olá tudo bem? Sou como um Personal Fitness em forma de chat, como posso de te ajudar?" },
        { text: "Ok, pode deixar, serei o seu Assistente Fitness, conte comigo" }
      ],
    },
  ],
  generationConfig: {
    maxOutputTokens: 400, //alterar isso caso fique sem resposta
  },
});


export function Chat(props) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  let text
  let newHist = []

  async function run(query) {
    try {
      setLoading(true)
      const result = await chat.sendMessage(query);
      const response = result.response;
      text = response.text()

      setMessages([...messages, {
        text,
        query
      }])

      newHist = [...chat.params.history, {
        role: "user",
        parts: query
      },
      {
        role: "model",
        parts: text
      }]

      chat.params.history = newHist

      setLoading(false)
      // scrollToBottom()
    } catch (e) {
      console.log(e)
      alert("Desculpe ocorreu algum erro, recarregue a página!")
      setLoading(false)
    }
  }

  const generatedMessages =  messages.map((msg, index) => {
    return (
      <div className="flex flex-col gap-3" key={index}>
        <Message isUser={true} name={props.name} text={msg.query} />
        <Message isUser={false} text={msg.text} />
      </div>
    )
  })

  const scrollToBottom = () => {
    let { scrollTop, scrollHeight } = chatRef.current;
    console.log(scrollTop, scrollHeight)
    scrollTop = scrollHeight
  }

  return (
    <section 
      className="flex flex-col gap-3 w-[85%] rounded-md mx-auto pb-2 bg-zinc-900"
    >
      <Header/>

      <div 
        className="chat max-h-80 overflow-y-auto px-2 flex flex-col gap-3"
      >
        <div className="flex flex-col gap-3">
          { generatedMessages }
        </div>

        {loading && <Loader/>}
      </div>

      <QueryForm run={run}/>
    </section>
  )
}