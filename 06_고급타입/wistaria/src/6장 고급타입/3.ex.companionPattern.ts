export type Currency = {
	unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
	value: number
}

export let Currency: {
	DEFAULT: Currency['unit']
	from(value: number, unit: Currency['unit']): Currency
} = {
	DEFAULT: 'USD',
	from(value: number, unit = Currency.DEFAULT): Currency {
		return { unit, value }
	},
}
