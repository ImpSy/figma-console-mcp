import { isDesktopBridgeEnabled } from "../src/core/desktop-bridge-config";

describe("isDesktopBridgeEnabled (FIGMA_DESKTOP_BRIDGE)", () => {
	it("is enabled when unset or empty", () => {
		expect(isDesktopBridgeEnabled(undefined)).toBe(true);
		expect(isDesktopBridgeEnabled("")).toBe(true);
		expect(isDesktopBridgeEnabled("  ")).toBe(true);
	});

	it.each(["true", "1", "yes", "on", "enabled", "TRUE", " On "])("is enabled for %p", (v) => {
		expect(isDesktopBridgeEnabled(v)).toBe(true);
	});

	it.each(["false", "0", "no", "off", "disabled", "FALSE", " Off "])("is disabled for %p", (v) => {
		expect(isDesktopBridgeEnabled(v)).toBe(false);
	});

	it("throws on an unrecognised value instead of guessing", () => {
		expect(() => isDesktopBridgeEnabled("flase")).toThrow(/FIGMA_DESKTOP_BRIDGE must be true or false.*"flase"/);
	});
});
