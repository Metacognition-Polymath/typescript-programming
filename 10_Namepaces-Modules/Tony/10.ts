// 연습문제 1번
export default null // Force module mode

// 1. Play around with declaration merging, to:

// 1a. Re-implement companion objects using namespaces and interfaces, instead of values and types.

interface Currency {
  unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
  value: number
}

namespace Currency {
  export let DEFAULT: Currency['unit'] = 'USD'
  export function from(value: number, unit = Currency.DEFAULT): Currency {
    return {unit, value}
  }
}

let amountDue: Currency = {
  unit: 'JPY',
  value: 83733.1
}

let otherAmountDue = Currency.from(330, 'EUR')

// 연습문제 2번
enum Color {
  RED = '#ff0000',
  GREEN = '#00ff00',
  BLUE = '#0000ff'
}

namespace Color {
  export function getClosest(to: string): Color {
    return Color.RED;
  }
}

console.log(Color.getClosest(Color.BLUE));

