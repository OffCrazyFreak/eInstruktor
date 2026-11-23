import { Component, type ErrorInfo, type ReactNode } from "react";

interface IVisualErrorBoundaryProps {
	children: ReactNode;
	fallback: ReactNode;
}

interface IVisualErrorBoundaryState {
	failed: boolean;
}

/** React only catches render errors in a class component, so one broken visual cannot blank the whole lesson. */
export default class VisualErrorBoundary extends Component<
	IVisualErrorBoundaryProps,
	IVisualErrorBoundaryState
> {
	state: IVisualErrorBoundaryState = { failed: false };

	static getDerivedStateFromError(): IVisualErrorBoundaryState {
		return { failed: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Visual failed to render", error, info.componentStack);
	}

	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
}
