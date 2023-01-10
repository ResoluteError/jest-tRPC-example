import { test, expect } from "@jest/globals";
import { appRouter } from "../../root";
import { prisma } from "../../../db";
import { Session } from "next-auth";

test("getSecretMessage test", async () => {
  const mockSession: Session = {
    expires: new Date().toISOString(),
    user: { id: "test-user-id", name: "Test User" },
  };

  const caller = appRouter.createCaller({
    session: mockSession,
    prisma: prisma,
  });

  const result = await caller.example.getSecretMessage();

  expect(result).toBe("you can now see this secret message!");
});
