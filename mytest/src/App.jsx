import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TestPage from './pages/test'
import './App.scss'

import BlogAdmin from './pages/admin/blog-admin';
import BlogEdit from './pages/admin/blog-edit';
import BlogAdd from './pages/admin/blog-add';
import BlogView from './pages/admin/blog-view';
import BlogCate from './pages/admin/blog-cate/blog-categories';
import TestEditor from './pages/admin/test-editor';
import BlogsFilteredByCate from './pages/admin/blog-cate/blog-cate';
function App() {

  return (
    <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
      <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
        <Routes>
          <Route path="/test" element={<h1>HELLO!</h1>}/>
          <Route path="/" element={<TestPage />}/>

          <Route path="/blog-admin" element={<BlogAdmin />}/>
          <Route path="/blog-edit/:id" element={<BlogEdit />}/>
          <Route path="/blog-view/:id" element={<BlogView />}/>
          <Route path="/blog-add" element={<BlogAdd />}/>
          <Route path="/blog-categories" element={<BlogCate />}/>
          <Route path="/blog-category/:id" element={<BlogsFilteredByCate />}/>

          <Route path="/test-editor" element={<TestEditor />}/>
        </Routes>
      </BrowserRouter>
    </FrappeProvider>
  )
}

export default App
