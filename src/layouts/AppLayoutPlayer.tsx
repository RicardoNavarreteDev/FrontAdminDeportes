import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <>
    <Outlet />
    <div>AppLayout</div>
    </>
  )
}
