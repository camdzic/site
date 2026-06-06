import type { Activity } from 'react-use-lanyard';

export type DisplayActivity = {
  id: string;
  name: string;
  details: string | undefined;
  state: string | undefined;
  largeImageUrl: string;
  largeImageAlt: string;
  smallImageUrl: string | undefined;
  smallImageAlt: string | undefined;
  href: string | undefined;
  progress: { startMs: number; endMs: number } | undefined;
};

const spotifyPrefix = 'spotify:';
const externalProxyPrefix = 'mp:';

export function buildImageUrl(
  image: string | undefined,
  applicationId: string | undefined
) {
  if (!image) {
    return undefined;
  }

  if (image.startsWith(spotifyPrefix)) {
    return `https://i.scdn.co/image/${image.slice(spotifyPrefix.length)}`;
  }

  if (image.startsWith(externalProxyPrefix)) {
    return undefined;
  }

  if (!applicationId) {
    return undefined;
  }

  return `https://cdn.discordapp.com/app-assets/${applicationId}/${image}.png`;
}

function spotifyProgress(activity: Activity) {
  const timestamps = activity.timestamps;

  if (!timestamps) {
    return undefined;
  }

  if (!timestamps.end) {
    return undefined;
  }

  return { startMs: timestamps.start, endMs: timestamps.end };
}

function normalizeActivity(activity: Activity): DisplayActivity | null {
  const { assets } = activity;

  if (!assets) {
    return null;
  }

  const largeImageUrl = buildImageUrl(
    assets.large_image,
    activity.application_id
  );

  if (!largeImageUrl) {
    return null;
  }

  const smallImageUrl = buildImageUrl(
    assets.small_image,
    activity.application_id
  );

  const isSpotify = assets.large_image.startsWith(spotifyPrefix);

  const progress = isSpotify ? spotifyProgress(activity) : undefined;

  const href =
    isSpotify && activity.sync_id
      ? `https://open.spotify.com/track/${activity.sync_id}`
      : undefined;

  const state =
    isSpotify && activity.state
      ? activity.state.replace(/;\s*/g, ', ')
      : activity.state;

  return {
    id: activity.id,
    name: activity.name,
    details: activity.details,
    state,
    largeImageUrl,
    largeImageAlt: assets.large_text || activity.name,
    smallImageUrl,
    smallImageAlt: smallImageUrl
      ? assets.small_text || activity.name
      : undefined,
    href,
    progress
  };
}

export function normalizeActivities(
  activities: Activity[] | undefined
): DisplayActivity[] {
  if (!activities || activities.length === 0) {
    return [];
  }

  const listeningFirst = [...activities].sort((a, b) => {
    const aListening = a.type === 2 ? 0 : 1;
    const bListening = b.type === 2 ? 0 : 1;

    return aListening - bListening;
  });

  const result: DisplayActivity[] = [];

  for (const activity of listeningFirst) {
    const normalized = normalizeActivity(activity);

    if (normalized) {
      result.push(normalized);
    }
  }

  return result;
}
