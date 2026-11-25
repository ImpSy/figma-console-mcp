/**
 * FIGMA_DESKTOP_BRIDGE — turn the local WebSocket Desktop Bridge on or off.
 *
 * Set it to a false value to run local mode without Figma Desktop (CI, servers,
 * containers): the server then opens no WebSocket port, doesn't scan for or
 * stop other figma-console-mcp instances, and doesn't copy the plugin files.
 * REST-based tools keep working with FIGMA_ACCESS_TOKEN.
 */

export const DESKTOP_BRIDGE_ENV = "FIGMA_DESKTOP_BRIDGE";

const TRUE_VALUES = new Set(["1", "true", "yes", "on", "enabled"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off", "disabled"]);

/** Error message bridge-only tools return while the bridge is disabled. */
export const DESKTOP_BRIDGE_DISABLED_MESSAGE =
	`The Desktop Bridge is disabled (${DESKTOP_BRIDGE_ENV}=false), so this tool can't reach Figma.\n\n` +
	`Use the REST API tools instead (they need FIGMA_ACCESS_TOKEN), or remove ${DESKTOP_BRIDGE_ENV} ` +
	`from the MCP config and restart the server to use the Desktop Bridge plugin.`;

/**
 * Parse FIGMA_DESKTOP_BRIDGE. Unset or empty means enabled. Throws on an
 * unrecognised value, so a typo can't leave the bridge on by accident.
 */
export function isDesktopBridgeEnabled(raw: string | undefined): boolean {
	if (raw === undefined) return true;
	const value = raw.trim().toLowerCase();
	if (value === "" || TRUE_VALUES.has(value)) return true;
	if (FALSE_VALUES.has(value)) return false;
	throw new Error(
		`${DESKTOP_BRIDGE_ENV} must be true or false (also accepted: 1/0, yes/no, on/off, enabled/disabled), got "${raw}"`,
	);
}
