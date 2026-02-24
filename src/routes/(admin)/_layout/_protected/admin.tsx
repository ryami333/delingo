import { ReleasesAdmin } from "../../../../components/ReleasesAdmin";
import { getReleases } from "../../../../helpers/getReleases";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/_layout/_protected/admin")({
  loader: () => getReleases(),
  component: RouteComponent,
});

function RouteComponent() {
  const releases = Route.useLoaderData();

  return <ReleasesAdmin releases={releases} />;
}
