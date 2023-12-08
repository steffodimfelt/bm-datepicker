import { CheckLockPipe } from "./check-lock.pipe";
import { DomSanitizer } from "@angular/platform-browser";
import { inject, TestBed } from "@angular/core/testing";

describe("CheckLockPipePipe", () => {
  it("create an instance", inject([DomSanitizer], (domSanitizer: any) => {
    const pipe = new CheckLockPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
