import type { IScheduledSound } from "@/components/custom/visuals/sound-signal-player/sound-patterns";

type AudioContextClass = typeof AudioContext;

/** Creates the audio context only on a tap, because browsers block sound that starts on its own. */
export function createAudioContext(): AudioContext | null {
	const AudioContextImpl: AudioContextClass | undefined =
		window.AudioContext ??
		(window as Window & { webkitAudioContext?: AudioContextClass })
			.webkitAudioContext;

	return AudioContextImpl ? new AudioContextImpl() : null;
}

/** Schedules every sound and returns a function that silences them all. */
export function playSchedule(
	context: AudioContext,
	sounds: readonly IScheduledSound[],
): () => void {
	const output = context.createGain();
	const begin = context.currentTime + 0.05;

	output.gain.value = 0.22;
	output.connect(context.destination);

	for (const sound of sounds) {
		const at = begin + sound.start;

		if (sound.element === "short" || sound.element === "long") {
			horn(context, output, at, sound.duration);
		} else if (sound.element === "stroke") {
			ping(context, output, at, 0.9);
		} else {
			for (let offset = 0; offset < sound.duration; offset += 0.16) {
				ping(context, output, at + offset, 0.25);
			}
		}
	}

	return () => {
		output.gain.cancelScheduledValues(context.currentTime);
		output.gain.setValueAtTime(0, context.currentTime);
		output.disconnect();
	};
}

function horn(
	context: AudioContext,
	output: AudioNode,
	at: number,
	duration: number,
) {
	const filter = context.createBiquadFilter();
	const envelope = context.createGain();

	filter.type = "lowpass";
	filter.frequency.value = 900;
	envelope.gain.setValueAtTime(0, at);
	envelope.gain.linearRampToValueAtTime(1, at + 0.06);
	envelope.gain.setValueAtTime(1, at + duration - 0.08);
	envelope.gain.linearRampToValueAtTime(0, at + duration);
	filter.connect(envelope);
	envelope.connect(output);

	for (const frequency of [180, 181.6, 360]) {
		const oscillator = context.createOscillator();

		oscillator.type = "sawtooth";
		oscillator.frequency.value = frequency;
		oscillator.connect(filter);
		oscillator.start(at);
		oscillator.stop(at + duration + 0.02);
	}
}

function ping(
	context: AudioContext,
	output: AudioNode,
	at: number,
	decay: number,
) {
	const oscillator = context.createOscillator();
	const envelope = context.createGain();

	oscillator.type = "triangle";
	oscillator.frequency.value = 1320;
	envelope.gain.setValueAtTime(0.8, at);
	envelope.gain.exponentialRampToValueAtTime(0.001, at + decay);
	oscillator.connect(envelope);
	envelope.connect(output);
	oscillator.start(at);
	oscillator.stop(at + decay + 0.02);
}
