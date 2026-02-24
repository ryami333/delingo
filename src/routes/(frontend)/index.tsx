import { Coverflow } from "../../components/CoverFlow";
import { getReleases } from "../../helpers/getReleases";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(frontend)/")({
  loader: () => getReleases(),
  component: HomePage,
});

function HomePage() {
  const releases = Route.useLoaderData();

  return (
    <div>
      <Coverflow releases={releases} />
    </div>
  );
}
