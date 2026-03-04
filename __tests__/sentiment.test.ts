import { classifyOverallSentimentFromScore } from "@/lib/sentiment";

describe("classifyOverallSentimentFromScore", () => {
  it("classifies clearly positive scores as positive", () => {
    expect(classifyOverallSentimentFromScore(0.8)).toBe("positive");
    expect(classifyOverallSentimentFromScore(0.3)).toBe("positive");
  });

  it("classifies clearly negative scores as negative", () => {
    expect(classifyOverallSentimentFromScore(-0.8)).toBe("negative");
    expect(classifyOverallSentimentFromScore(-0.4)).toBe("negative");
  });

  it("classifies near-neutral scores as mixed", () => {
    expect(classifyOverallSentimentFromScore(0)).toBe("mixed");
    expect(classifyOverallSentimentFromScore(0.1)).toBe("mixed");
    expect(classifyOverallSentimentFromScore(-0.1)).toBe("mixed");
  });
});

