import { useState } from "react";
import { ArrowUp } from "lucide-react";

export default function QueryForm(props) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    props.run(input)
    setInput('')
  }

  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-2">
      <div className="mx-2 flex gap-3 justify-between rounded-xl py-1 px-2  ring-gray-700 ring-1">
        <input
          type="text"
          className="block w-[70%] p-4 text-sm font-semibold text-white rounded-lg focus:outline-none bg-transparent"
          placeholder="Pergunte algo ao ChatFit"
          value={input}
          onChange={handleChange}
        />

        <button type="submit"
          className={`
             text-center text-white bg-purple-700 hover:bg-purple-900 focus:outline-none rounded-lg p-3
            disabled:bg-gray-600
            `}
          disabled={input === ''}
        >
          <ArrowUp strokeWidth={2} size={20} />
        </button>
      </div>
    </form>
  )
} 