import React from "react";
import { FancyButton } from "./1.fancyButton";

type Props = {
  firstName: string;
  userId: string;
}

type State = {
  isLoading: boolean;
}

class SignForm extends React.Component<Props, State> {
  state = {
    isLoading: false,
  };
  render() {
    return <>
      <h2>
        Sign up for a 7-day supply of our tasty
        toothpaste now, {this.props.firstName}.
      </h2>
      <FancyButton
        isDisabled={this.state.isLoading}
        size='big'
        text='Sign up Now'
        onClick={this.signUp}
      />
    </>;
  }
  private signUp = async ()=>{
    this.setState({isLoading: true});
    try {
      await fetch('/api/signup?userId='+this.props.userId)
    } finally {
      this.setState({isLoading: false});
    }
  }
}

let form = <SignForm firstName="John" userId="2af32qa"/>;



