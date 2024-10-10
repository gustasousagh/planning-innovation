import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRoom = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const joinCode = generateCode();

    const roomId = await ctx.db.insert("rooms", {
      name: args.name,
      userId,
      joinCode,
      numbersRevealed: false
    });
    await ctx.db.insert("playes", {
      userId,
      roomId: roomId,
      role: "admin",
      lastSeen: Date.now()
    });
    return roomId;
  },
});
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const players = await ctx.db
      .query("playes")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const roomsIds = players.map((player) => player.roomId);

    const rooms = [];

    for (const roomId of roomsIds) {
      const room = await ctx.db.get(roomId);
      if (room) {
        rooms.push(room);
      }
    }
    return rooms;
  },
});
export const getById = query({
  args: { id: v.id("rooms") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("unauthorized");
    }
    const player = await ctx.db
      .query("playes")
      .withIndex("by_room_id_user_id", (q) =>
        q.eq("roomId", args.id).eq("userId", userId)
      )
      .unique();
    if (!player) {
      return null;
    }
    return await ctx.db.get(args.id);
  },
});
export const getInfoById = query({
  args: {id: v.id("rooms")},
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if(!userId){
      return null;
    }
    const member = await ctx.db.query("playes")
    .withIndex("by_room_id_user_id", (q) =>
    q.eq("roomId", args.id).eq("userId", userId))
    .unique();

    const rooms = await ctx.db.get(args.id)
    return {
      name: rooms?.name,
      isMember: !!member
    }
  }
})
export const join = mutation({
  args: {
    joinCode: v.string(),
    roomId: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if(!userId){
      throw new Error("Unauthorized")
    }
    const room = await ctx.db.get(args.roomId);
    if(!room){
      throw new Error("workspace not found")
    }
    if(room.joinCode !== args.joinCode.toLowerCase()){
      throw new Error("huh")
    }


    const existMember = await ctx.db.query("playes")
    .withIndex("by_room_id_user_id", (q) =>
    q.eq("roomId", args.roomId).eq("userId", userId))
    .unique();

    if(existMember ){
      throw new Error("ja existe")
    }
    await ctx.db.insert("playes", {
      userId,
      roomId: room._id,
      role: "player",
      lastSeen: Date.now()
    })
    return room._id;
  }
  
})
export const revealNumbers = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const room = await ctx.db.get(roomId);
    if (!room || room.userId !== userId) {
      throw new Error("Only the room admin can reveal numbers");
    }

    await ctx.db.patch(roomId, {
      numbersRevealed: true,
    });
    return true;
  },
});
export const resetVisibility = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const room = await ctx.db.get(roomId);
    if (!room || room.userId !== userId) {
      throw new Error("Only the room admin can reset visibility");
    }
    await ctx.db.patch(roomId, {
      numbersRevealed: false,
    });
    const playersInRoom = await ctx.db
      .query("playes")
      .withIndex("by_room_id", (q) => q.eq("roomId", roomId))
      .collect();

    for (const player of playersInRoom) {
      await ctx.db.patch(player._id, {
        selectedNumber: undefined,
      });
    }
  },
});
export const remove = mutation({
  args: {
    id: v.id("rooms"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if(!userId){
      throw new Error("unauthorized")
    }
    const player = await ctx.db.query("playes")
    .withIndex("by_room_id_user_id", (q) =>
    q.eq("roomId", args.id).eq("userId", userId))
    .unique();
    if(!player || player.role !== "admin"){
      throw new Error("Unauthorized");
    }
    const [players] = await Promise.all([
      ctx.db
      .query("playes")
      .withIndex("by_room_id", (q) => q.eq("roomId", args.id))
      .collect()
    ]);
    for(const player of players){
      await ctx.db.delete(player._id)
    }
    await ctx.db.delete(args.id)
    return args.id;
  }
})
export const update = mutation({
  args: {
    id: v.id("rooms"),
    name: v.string()
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if(!userId){
      throw new Error("unauthorized")
    }
    const player = await ctx.db.query("playes")
    .withIndex("by_room_id_user_id", (q) =>
    q.eq("roomId", args.id).eq("userId", userId))
    .unique();
    if(!player || player.role !== "admin"){
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      name: args.name
    })
    return args.id;
  }
})
const generateCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
};
