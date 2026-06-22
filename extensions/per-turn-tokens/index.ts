/**
 * Per-turn token tracker — shows token usage for each prompt-response cycle.
 *
 * After each turn completes, prints a notification in the TUI:
 *   Turn 3: ↑452 ↓1,230 R200 $0.008 (45 t/s)
 *
 * Zero system-prompt overhead. No context pollution.
 */

import type { AssistantMessage } from "@earendil-works/pi-ai";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	let turnIndex = 0;
	let assistantStartTime: number | null = null;

	pi.on("turn_start", async (event) => {
		turnIndex = event.turnIndex;
	});

	pi.on("message_start", async (event) => {
		if (event.message.role === "assistant") {
			assistantStartTime = Date.now();
		}
	});

	pi.on("message_end", async (event, ctx) => {
		if (event.message.role !== "assistant") return;

		const m = event.message as AssistantMessage;
		const { input, output, reasoningTokens, cost } = m.usage;

		const elapsed = assistantStartTime ? (Date.now() - assistantStartTime) / 1000 : 0;
		const speed = elapsed > 0.5 && output > 0 ? Math.round(output / elapsed) : null;
		assistantStartTime = null;

		const fmt = (n: number) => {
			if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
			if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
			return `${n}`;
		};

		const parts = [
			`↑${fmt(input)}`,
			`↓${fmt(output)}`,
		];

		const rt = reasoningTokens ?? 0;
		if (rt > 0) parts.push(`R${fmt(rt)}`);

		if (cost.total > 0) parts.push(`$${cost.total.toFixed(4)}`);

		if (speed !== null) parts.push(`${fmt(speed)} t/s`);

		const label = `Turn ${turnIndex}:`;
		const message = `${label} ${parts.join(" ")}`;

		try {
			ctx.ui.notify(message, "info");
		} catch {
			// fail silently — notification is best-effort
		}
	});
}
