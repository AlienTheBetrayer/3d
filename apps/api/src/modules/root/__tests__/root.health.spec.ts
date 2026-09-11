import { RootService } from "../root.service.js";

describe("root health", () => {
  it("should return ok", () => {
    const rootService = new RootService();
    const result = rootService.health();

    expect(result).toEqual({
      service: "Flexbound API",
      status: "ok",
    });
  });
});
