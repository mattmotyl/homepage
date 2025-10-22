import { Route, Routes, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { PageProvider } from './components/PageProvider'
import WelcomePage from './pages/Welcome'
import IntroductionPage from './pages/Introduction'
import FoundationsPage from './pages/Foundations'
import WarehousesPage from './pages/Warehouses'
import ComparisonsPage from './pages/Comparisons'
import DatasetsPage from './pages/Datasets'
import HarmsPage from './pages/Harms'
import UsingApisPage from './pages/UsingApis'
import ConclusionPage from './pages/Conclusion'
import PracticePage from './pages/Practice'
import EngagePage from './pages/Engage'

const App = () => {
  return (
    <PageProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="introduction" element={<IntroductionPage />} />
          <Route path="collect" element={<FoundationsPage />} />
          <Route path="stored-used" element={<WarehousesPage />} />
          <Route path="share" element={<ComparisonsPage />} />
          <Route path="others-share" element={<DatasetsPage />} />
          <Route path="mapping" element={<HarmsPage />} />
          <Route path="using-apis" element={<UsingApisPage />} />
          <Route path="conclusion" element={<ConclusionPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="engage" element={<EngagePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageProvider>
  )
}

export default App
