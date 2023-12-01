import { colorCodes, formatCodes } from "./constants"
import { TextPart, TextSpan } from "./types"

/**
 * Parses Minecraft text and returns an array of TextSpan objects.
 * Each TextSpan object represents a part of the text with its associated style.
 *
 * @param text The Minecraft text to parse.
 * @param realtime Optional. Specifies whether the parsing should be done in real-time. Default is false.
 * @returns An array of TextSpan objects representing the parsed text.
 * @throws Error if the text is empty or does not contain color codes (when realtime is false).
 */
export const parseMinecraftText = (
	text: string,
	realtime: boolean = false
): TextSpan[] => {
	if (!realtime) {
		if (text.length === 0) throw new Error("Text is empty")
		if (!text.includes("&"))
			throw new Error("Text does not contain color codes")
	}

	const parts: TextPart[] = []

	// Initialize currentPart
	let currentPart: TextPart = {
		codes: [],
		text: "",
	}

	// Start looping through each character in the text
	for (let i = 0; i < text.length; i++) {
		// Get the current character and the next character
		const char = text[i]
		const nextChar = text[i + 1]

		// If the current character is "&" and the next character exists
		if (char === "&" && nextChar !== undefined) {
			// If the next character is also "&"
			if (nextChar === "&") {
				currentPart.text += "&"
				i++
			}

			// If the next character is not "&"
			else {
				// If the current part has text, push it to the parts array
				if (currentPart.text.length > 0) {
					parts.push(currentPart)
					currentPart = {
						codes: [],
						text: "",
					}
				}

				// Push the color code to the current part
				currentPart.codes.push(nextChar)
				i++
			}
		}

		// If the current character is not "&"
		else {
			currentPart.text += char

			// If this is the last character, push the current part to the parts array
			if (i === text.length - 1) {
				parts.push(currentPart)
			}
		}
	}

	const spans: { text: string; style: string }[] = []

	for (const part of parts) {
		const style = part.codes
			.map((code) => {
				if (colorCodes[code]) return colorCodes[code]
				if (formatCodes[code]) return formatCodes[code]

				return ""
			})
			.join(" ")

		spans.push({
			text: part.text,
			style,
		})
	}

	return spans
}
