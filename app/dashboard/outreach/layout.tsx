import AdminNav from '../../components/AdminNav'
import OutreachSubNav from './components/OutreachSubNav'

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNav />
      <OutreachSubNav />
      {children}
    </>
  )
}
