interface ILoginNudgeSlotProps {
	/** What the learner just finished; the account PR decides per trigger whether the "Spremi napredak" sheet opens. */
	trigger: "practice-set";
}

/** Marks where the login sheet opens after finished work; it renders nothing until accounts land. */
export default function LoginNudgeSlot(_props: ILoginNudgeSlotProps) {
	return null;
}
