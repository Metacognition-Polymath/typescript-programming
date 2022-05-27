import React from 'react'
// npm i @types/react 설치하니 오류 안남.

type Props = {
	isDisabled?: boolean
	size: 'big' | 'small'
	text: string
	onClick(event: React.MouseEvent<HTMLButtonElement>): void
}

export function FancyButton(props: Props) {
	const [toggle, setToggle] = React.useState(false)
	return (
		<button
			className={'Size-' + props.size}
			disabled={props.isDisabled || false}
			onClick={(event) => {
				setToggle(!toggle)
				props.onClick(event)
			}}
		>
			{props.text}
		</button>
	)
}

let button = (
	<FancyButton
		size="big"
		text="Sign up now"
		onClick={() => console.log('clicked')}
	/>
)
