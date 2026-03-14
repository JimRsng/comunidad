import { getStreamerEmotes } from "streamer-emotes";

export default defineCachedEventHandler(async () => {
  const emoteLookup: Record<string, string> = {};

  const emotes = await getStreamerEmotes(SITE.twitchLogin, {
    bttv: true,
    ffz: true,
    sevenTV: true,
    twitch: true
  });

  if (!emotes) return emoteLookup;

  for (const [_, provider] of Object.entries(emotes)) {
    const allEmotes = [...(provider.channel || []), ...(provider.global || [])];
    for (const emote of allEmotes) {
      if (emote.images[0]) emoteLookup[emote.name] = emote.images[0].url;
    }
  }

  return emoteLookup;
}, {
  maxAge: 7 * 24 * 60 * 60, // 1 week
  swr: false,
  group: "api",
  name: "channel-emotes",
  getKey: () => "all"
});
