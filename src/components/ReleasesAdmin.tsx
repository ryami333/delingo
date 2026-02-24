import { createReleaseFromMusicBrainz } from "../helpers/createReleaseFromMusicBrainz";
import { deleteRelease } from "../helpers/deleteRelease";
import { ReleaseDocument } from "../helpers/releaseSchema";
import { Serialized } from "../helpers/serializeDocument";
import { urlStringToTransformConfig } from "../helpers/urlStringToTransformCodec";
import { ReleasePicker } from "./ReleasePicker";
import { Button, LoadingOverlay, Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "@tanstack/react-router";
import classNames from "classnames/bind";
import { useTransition } from "react";
import styles from "./ReleasesAdmin.module.css";

const cx = classNames.bind(styles);

export function ReleasesAdmin({
  releases,
}: {
  releases: Serialized<ReleaseDocument>[];
}) {
  const [creatingRelease, startCreatingReleaseTransition] = useTransition();
  const [deletingRelease, startDeletingReleaseTransition] = useTransition();

  const router = useRouter();

  return (
    <div>
      <LoadingOverlay visible={creatingRelease} />
      <ReleasePicker
        onClickCreateRelease={({ release }) => {
          startCreatingReleaseTransition(() =>
            createReleaseFromMusicBrainz({
              data: {
                release,
              },
            })
              .then(() =>
                notifications.show({
                  message: "Sucessfully created release",
                  color: "green",
                }),
              )
              .catch((e) => {
                console.error(e);
                notifications.show({
                  message: "Unexpected error occured while creating release",
                  color: "red",
                });
              })
              .then(() => router.invalidate()),
          );
        }}
      />
      <div className={cx("releases")}>
        {releases.map((release, index) => {
          const src = urlStringToTransformConfig.encode({
            w: 400,
            h: 400,
            source: release.cover.filename,
            fmt: "webp",
          });
          return (
            <Paper key={index} className={cx("release")} withBorder>
              <img src={src} className={cx("cover-art")} />
              <dl className={cx("release-details")}>
                <Text component="dt" fw={700}>
                  Title
                </Text>
                <Text component="dd">{release.title}</Text>
                <Text component="dt" fw={700}>
                  Artists
                </Text>
                <Text component="dd">
                  {release.artists.map((artist) => artist.name).join(", ")}
                </Text>
                <Text component="dt" fw={700}>
                  Date
                </Text>
                <Text component="dd">{release.date}</Text>
              </dl>
              <div className={cx("actions")}>
                <Button
                  className={cx("delete-button")}
                  color="red"
                  leftSection={<IconTrash size={16} />}
                  loading={deletingRelease}
                  onClick={() => {
                    startDeletingReleaseTransition(() =>
                      deleteRelease({ data: { id: release.id } })
                        .then(() =>
                          notifications.show({
                            message: "Successfully deleted release",
                            color: "green",
                          }),
                        )
                        .catch((e) => {
                          console.error(e);
                          notifications.show({
                            message:
                              "Unexpected error occured while deleting release",
                            color: "red",
                          });
                        })
                        .then(() => router.invalidate()),
                    );
                  }}
                >
                  Delete
                </Button>
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}
