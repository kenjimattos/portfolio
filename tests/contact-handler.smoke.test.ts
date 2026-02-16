import assert from "node:assert/strict";
import { test } from "node:test";
import { createContactHandler } from "../app/api/contact/handler.ts";

test("returns 400 for invalid JSON payload", async () => {
  const handler = createContactHandler({
    env: { resendApiKey: "test-key", contactEmail: "owner@example.com" },
    sendEmail: async () => {},
  });

  const request = {
    headers: new Headers({ "x-forwarded-for": "10.0.0.1" }),
    json: async () => {
      throw new Error("invalid json");
    },
  };

  const response = await handler(request);

  assert.equal(response.status, 400);
  assert.equal(response.body.error, "Invalid request body");
});

test("returns fake success when honeypot is filled", async () => {
  const sendEmailCalls: Array<Record<string, string>> = [];
  const handler = createContactHandler({
    env: { resendApiKey: "test-key", contactEmail: "owner@example.com" },
    sendEmail: async (payload) => {
      sendEmailCalls.push(payload);
    },
  });

  const request = {
    headers: new Headers({ "x-forwarded-for": "10.0.0.2" }),
    json: async () => ({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello from smoke test",
      website: "bot-filled",
    }),
  };

  const response = await handler(request);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(sendEmailCalls.length, 0);
});

test("returns 429 after exceeding request limit for the same client", async () => {
  const handler = createContactHandler({
    env: { resendApiKey: "test-key", contactEmail: "owner@example.com" },
    sendEmail: async () => {},
  });

  const request = {
    headers: new Headers({ "x-forwarded-for": "10.0.0.3" }),
    json: async () => ({
      name: "John Doe",
      email: "john@example.com",
      message: "Rate limit smoke test",
      website: "bot-filled",
    }),
  };

  await handler(request);
  await handler(request);
  await handler(request);
  const limitedResponse = await handler(request);

  assert.equal(limitedResponse.status, 429);
  assert.ok(limitedResponse.headers?.["Retry-After"]);
});

test("returns success and sends email for a valid payload", async () => {
  const sendEmailCalls: Array<Record<string, string>> = [];
  const handler = createContactHandler({
    env: { resendApiKey: "test-key", contactEmail: "owner@example.com" },
    sendEmail: async (payload) => {
      sendEmailCalls.push(payload);
    },
  });

  const request = {
    headers: new Headers({ "x-forwarded-for": "10.0.0.4" }),
    json: async () => ({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "Hello",
      website: "",
    }),
  };

  const response = await handler(request);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(sendEmailCalls.length, 1);
  assert.equal(sendEmailCalls[0]?.to, "owner@example.com");
  assert.equal(sendEmailCalls[0]?.replyTo, "jane@example.com");
});
