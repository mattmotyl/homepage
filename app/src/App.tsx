import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { PageProvider } from './components/PageProvider'
import WelcomePage from './pages/Welcome'
import FoundationsPage from './pages/Foundations'
import ApiPage from './pages/Api'
import WarehousesPage from './pages/Warehouses'
import WorkflowsPage from './pages/Workflows'
import HarmsPage from './pages/Harms'
import DatasetsPage from './pages/Datasets'
import ComparisonsPage from './pages/Comparisons'
import EngagePage from './pages/Engage'

const App = () => {
  return (
    <PageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="foundations" element={<FoundationsPage />} />
          <Route path="api" element={<ApiPage />} />
          <Route path="warehouses" element={<WarehousesPage />} />
          <Route path="workflows" element={<WorkflowsPage />} />
          <Route path="harms" element={<HarmsPage />} />
          <Route path="datasets" element={<DatasetsPage />} />
          <Route path="comparisons" element={<ComparisonsPage />} />
          <Route path="engage" element={<EngagePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageProvider>
  )
}

export default App
