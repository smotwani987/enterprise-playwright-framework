import { test, expect } from "@playwright/test";
import { PollingHelper } from "../../utils/async/PollingHelper";

test("Pool Test", async () => {

    let attempts = 0;

    const result = await PollingHelper.poll(
        async () => {
            attempts++;
            return attempts >= 3 ? "COMPLETED" : "PROCESSING";
        },

        (status) => status === "COMPLETED",

        10_000, // timeout
        1_000   // poll every 1 sec
    );

    expect(result).toBe("COMPLETED");
});