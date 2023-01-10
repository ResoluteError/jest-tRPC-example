import { test, expect } from "@jest/globals";
import { appRouter } from "../../root";
import { createInnerTRPCContext } from "../../trpc";
import { Example, PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";

test("getAll test", async () => {
  const prismaMock = mockDeep<PrismaClient>();

  const mockOutput: Example[] = [
    {
      id: "test-user-id",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  prismaMock.example.findMany.mockResolvedValue(mockOutput);

  const caller = appRouter.createCaller(
    createInnerTRPCContext({ session: null, prisma: prismaMock })
  );

  const result = await caller.example.getAll();

  expect(result).toHaveLength(mockOutput.length);
  expect(result).toStrictEqual(mockOutput);
});
