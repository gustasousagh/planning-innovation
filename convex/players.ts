import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const populeteUser = (ctx: QueryCtx, id: Id<"users">) => {
  return ctx.db.get(id);
};
export const get = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return [];
    }
    const player = await ctx.db
      .query("playes")
      .withIndex("by_room_id_user_id", (q) =>
        q.eq("roomId", args.roomId).eq("userId", userId)
      )
      .unique();
    if (!player) {
      return [];
    }
    const data = await ctx.db
      .query("playes")
      .withIndex("by_room_id", (q) => q.eq("roomId", args.roomId))
      .collect();

    const players = [];
    for (const player of data) {
      const user = await populeteUser(ctx, player.userId);
      if (user) {
        players.push({
          ...player,
          user,
        });
      }
    }
    return players;
  },
});
export const current = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }
    const player = await ctx.db
      .query("playes")
      .withIndex("by_room_id_user_id", (q) =>
        q.eq("roomId", args.roomId).eq("userId", userId)
      )
      .unique();
    if (!player) {
      return null;
    }
    return player;
  },
});
export const updatePlayerPresence = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const player = await ctx.db
      .query("playes")
      .withIndex("by_room_id_user_id", (q) =>
        q.eq("roomId", args.roomId).eq("userId", userId)
      )
      .unique();
    if (!player) {
      return null;
    }
    await ctx.db.patch(player._id, {
      userId,
      roomId: args.roomId,
      lastSeen: Date.now(),
    });
  },
});
export const getOnlinePlayers = query({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const room = await ctx.db.get(roomId);
    const numbersRevealed = room ? room.numbersRevealed : false;

    const now = Date.now();
    const onlineThreshold = 150000;

    const players = await ctx.db
      .query("playes")
      .withIndex("by_room_id", (q) => q.eq("roomId", roomId))
      .collect();

    const onlinePlayers = players.filter((player) => now - player.lastSeen <= onlineThreshold);
    const populatedPlayers = [];
    for (const player of onlinePlayers) {
      const user = await populeteUser(ctx, player.userId);
      if (user) {
        populatedPlayers.push({
          ...player,
          user,
          hasChosenNumber: player.selectedNumber !== undefined, // Retorna true se o número foi escolhido
          selectedNumber: numbersRevealed ? player.selectedNumber : "*",
        });
      }
    }
    return populatedPlayers;
  },
});

export const selectNumber = mutation({
  args: { roomId: v.id("rooms"), number: v.number() },
  handler: async (ctx, { roomId, number }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const player = await ctx.db
      .query("playes")
      .withIndex("by_room_id_user_id", (q) => q.eq("roomId", roomId).eq("userId", userId))
      .unique();
    
    if (!player) {
      throw new Error("Player not found in the room");
    }

    await ctx.db.patch(player._id, {
      selectedNumber: number,
    });
  },
});


