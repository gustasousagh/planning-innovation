import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  rooms: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
    numbersRevealed: v.boolean(),
    choices: v.optional(v.array(v.number())), // Valores padrão

  }),
  playes: defineTable({
    userId: v.id("users"),
    roomId: v.id("rooms"),
    role: v.union(v.literal("admin"), v.literal("player")),
    lastSeen: v.number(),
    selectedNumber: v.optional(v.number()),
  })
  .index("by_user_id", ["userId"])
  .index("by_room_id", ["roomId"])
  .index("by_room_id_user_id", ["roomId", "userId"]),
})
export default schema;