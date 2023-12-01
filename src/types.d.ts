export interface TextPart {
	codes: string[]
	text: string
}

export interface TextSpan {
	text: string
	style: string
}

export interface ColorCodes {
	[key: string]: string
}

export interface FormatCodes {
	[key: string]: string
}
