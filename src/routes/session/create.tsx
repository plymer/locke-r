import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/session/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/session/create"!</div>
}
