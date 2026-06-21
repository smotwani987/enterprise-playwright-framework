export class AnsiTextCleaner {

    static clean(value: string): string {
        if (!value) {
            return "";
        }

        return value.replace(
            // Removes ANSI escape sequences from Playwright output
            /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g,
            ""
        );
    }
}