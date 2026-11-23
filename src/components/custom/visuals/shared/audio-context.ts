type AudioContextClass = typeof AudioContext;

let shared: AudioContext | null = null;

/**
 * One AudioContext for every visual on the page, created on the first tap because browsers block sound that starts on its own.
 * Browsers cap how many contexts a page may open, and creation can throw, so this returns null instead of failing.
 * On iPhone the ring/silent switch mutes Web Audio, so a learner in silent mode hears nothing.
 */
export function getAudioContext(): AudioContext | null {
	if (shared) {
		return shared;
	}

	const AudioContextImpl: AudioContextClass | undefined =
		window.AudioContext ??
		(window as Window & { webkitAudioContext?: AudioContextClass })
			.webkitAudioContext;

	if (!AudioContextImpl) {
		return null;
	}

	try {
		shared = new AudioContextImpl();
	} catch {
		return null;
	}

	return shared;
}
