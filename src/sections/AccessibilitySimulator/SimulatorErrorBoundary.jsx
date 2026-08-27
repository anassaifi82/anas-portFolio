import { Component, createRef } from "react";

export default class SimulatorErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.errorHeadingRef = createRef();
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (!prevState.hasError && this.state.hasError) {
      this.errorHeadingRef.current?.focus();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" style={{ padding: "1.5rem" }}>
          <h2 ref={this.errorHeadingRef} tabIndex={-1}>
            Something went wrong
          </h2>
          <p>The simulator could not load. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
