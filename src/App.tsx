import { useEffect, useState } from "react"
import { parseMinecraftText } from "./utils"
import { defaultText } from "./constants"

export default function App() {
	const [text, setText] = useState<string>(defaultText)
	const [spans, setSpans] = useState<{ text: string; style: string }[]>([])
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const text = localStorage.getItem("text")
		if (text) {
			setText(text)
		}
	}, [])

	useEffect(() => {
		try {
			const spans = parseMinecraftText(text, true)
			setSpans(spans)
		} catch (error: any) {
			setSpans([])
			setText(defaultText)
			setError("Something went wrong while parsing the text")
		}
	}, [text])

	return (
		<>
			<div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 text-center">
				Currently, live mode is enabled by default. This means that the
				text will update as you type.
			</div>

			{error && (
				<div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-4 text-center">
					{error}
					<button
						className="absolute top-0 right-0 p-4"
						onClick={() => setError(null)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-white hover:text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			)}

			<div className="min-h-screen p-10 flex flex-col items-center justify-center font-minecraft bg-gradient-to-br from-gray-900 to-gray-800">
				<h1 className="text-4xl font-bold text-white mb-8 text-shadow-lg">
					Minecraft Text Color Generator
				</h1>
				<div className="flex flex-col items-center w-full max-w-lg">
					<input
						type="text"
						className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 py-2 px-4 w-full appearance-none leading-normal rounded-tl rounded-bl mb-4"
						value={text}
						onChange={(e) => {
							setText(e.target.value)
							localStorage.setItem("text", e.target.value)
						}}
						placeholder="Use & to start a color code"
					/>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-tr rounded-br w-full mb-4 opacity-20 cursor-not-allowed"
						title="Live mode is enabled by default"
					>
						Generate
					</button>

					{spans.length > 0 && (
						<div className="bg-chat rounded-lg shadow-lg p-5 w-full max-w-lg flex flex-wrap border border-gray-700">
							{spans.map((span, index) => (
								<span
									className={`${span.style} whitespace-pre-wrap break-all text-shadow-sm shadow-gray-900`}
									key={index}
								>
									{span.text}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}
