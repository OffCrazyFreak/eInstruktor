import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useExamClock from "@/features/exam/hooks/use-exam-clock";

const START = Date.parse("2026-11-20T11:00:00Z");

beforeEach(() => {
	vi.useFakeTimers();
	vi.setSystemTime(START);
});

afterEach(() => {
	vi.useRealTimers();
});

describe("useExamClock", () => {
	it("counts down and hands the exam in once at zero", () => {
		const onExpire = vi.fn();
		const { result } = renderHook(() => useExamClock(START + 3000, onExpire));

		expect(result.current).toBe(3000);

		act(() => {
			vi.advanceTimersByTime(2000);
		});

		expect(result.current).toBe(1000);
		expect(onExpire).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(5000);
		});

		expect(result.current).toBe(0);
		expect(onExpire).toHaveBeenCalledTimes(1);
	});

	it("hands in at once an exam opened after its time ran out", () => {
		const onExpire = vi.fn();

		renderHook(() => useExamClock(START - 60_000, onExpire));

		expect(onExpire).toHaveBeenCalledTimes(1);
	});

	it("jumps straight to the real time left when a sleeping tab wakes", () => {
		const onExpire = vi.fn();
		const { result } = renderHook(() =>
			useExamClock(START + 10 * 60_000, onExpire),
		);

		act(() => {
			vi.setSystemTime(START + 4 * 60_000);
			document.dispatchEvent(new Event("visibilitychange"));
		});

		expect(result.current).toBe(6 * 60_000);
	});

	it("runs no clock without a time limit", () => {
		const onExpire = vi.fn();
		const { result } = renderHook(() => useExamClock(null, onExpire));

		act(() => {
			vi.advanceTimersByTime(60_000);
		});

		expect(result.current).toBeNull();
		expect(onExpire).not.toHaveBeenCalled();
	});

	it("starts with the real time left before any tick", () => {
		const { result } = renderHook(() => useExamClock(START + 90_000, vi.fn()));

		expect(result.current).toBe(90_000);
	});

	it("hands in at once when opened exactly at the end time", () => {
		const onExpire = vi.fn();
		const { result } = renderHook(() => useExamClock(START, onExpire));

		expect(result.current).toBe(0);
		expect(onExpire).toHaveBeenCalledTimes(1);
	});

	it("follows the device clock when it jumps backwards, without handing in", () => {
		const onExpire = vi.fn();
		const { result } = renderHook(() => useExamClock(START + 60_000, onExpire));

		act(() => {
			vi.setSystemTime(START - 5 * 60_000);
			vi.advanceTimersByTime(1000);
		});

		expect(result.current).toBe(6 * 60_000 - 1000);
		expect(onExpire).not.toHaveBeenCalled();
	});
});
