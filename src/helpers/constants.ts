export const MUSICBRAINZ_RELEASE_TYPES = [
  "annotation",
  "area",
  "artist",
  "cdstub",
  "event",
  "instrument",
  "label",
  "place",
  "recording",
  "release",
  "release-group",
  "series",
  "tag",
  "work",
  "url",
] as const;

export type MusicbrainzReleaseType = (typeof MUSICBRAINZ_RELEASE_TYPES)[number];
