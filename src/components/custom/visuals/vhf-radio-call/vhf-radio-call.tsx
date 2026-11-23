import {
	readBoolean,
	readOption,
	type VisualProps,
} from "@/components/custom/visuals/shared/visual-props";
import CallOrder from "@/components/custom/visuals/vhf-radio-call/call-order";
import CallScript from "@/components/custom/visuals/vhf-radio-call/call-script";
import {
	CALL_IDS,
	type CallId,
} from "@/components/custom/visuals/vhf-radio-call/call-scripts";
import ControlsTour from "@/components/custom/visuals/vhf-radio-call/controls-tour";

const MODES = ["script", "order", "controls"] as const;

export interface IVhfRadioCallProps {
	/** Which call to practise. */
	call?: CallId;
	/** "controls" tours the radio's controls; "order" asks for the parts of the call in order. */
	mode?: (typeof MODES)[number];
	/** Question media: order mode lists the parts without checking them. */
	hideAnswer?: boolean;
}

export function fromVisualProps(
	props: VisualProps | undefined,
): IVhfRadioCallProps {
	return {
		call: readOption(props, "call", CALL_IDS),
		mode: readOption(props, "mode", MODES),
		hideAnswer: readBoolean(props, "hideAnswer"),
	};
}

export default function VhfRadioCall({
	call = "mayday",
	mode = "script",
	hideAnswer = false,
}: IVhfRadioCallProps) {
	if (mode === "controls") {
		return <ControlsTour />;
	}

	if (mode === "order") {
		return <CallOrder call={call} hideAnswer={hideAnswer} />;
	}

	return <CallScript key={call} call={call} />;
}
