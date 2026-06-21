export interface AgentTool<Input, Output> {
    name: string;

    execute(input: Input): Promise<Output>;
}