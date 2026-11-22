export class PollingHelper {

    static async poll<T>(
        action: () => Promise<T>,
        condition: (result: T) => boolean,
        timeoutMs: number,
        intervalMs: number
    ): Promise<T> {

        const startTime = Date.now();

        while (Date.now() - startTime < timeoutMs) {

            const result = await action();

            if (condition(result)) {
                return result;
            }

            await new Promise(resolve =>
                setTimeout(resolve, intervalMs)
            );
        }

        throw new Error(
            `Polling timeout: condition not met within ${timeoutMs}ms`
        );
    }
}