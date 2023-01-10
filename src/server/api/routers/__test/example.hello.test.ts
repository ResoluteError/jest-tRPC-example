import { test, expect } from "@jest/globals";
import { AppRouter, appRouter } from "../../root";
import { prisma } from "../../../db";
import { inferProcedureInput } from "@trpc/server";
import { createInnerTRPCContext } from "../../trpc";

test("hello test", async () => {
  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null })
  );

  type Input = inferProcedureInput<AppRouter["example"]["hello"]>;

  const input: Input = {
    text: "test",
  };

  const result = await caller.example.hello(input);

  expect(result).toStrictEqual({ greeting: "Hello test" });
});
