export declare function evaluateCodeWithGemini(taskName: string, codeSnippet: string): Promise<{
    score: number;
    feedback: string;
}>;
export declare function evaluateScreenshotWithGemini(taskName: string, imageBuffer: Buffer): Promise<{
    score: number;
    feedback: string;
}>;
//# sourceMappingURL=geminiClient.d.ts.map