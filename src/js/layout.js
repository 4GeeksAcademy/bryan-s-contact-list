import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './component/scrollToTop';

import ContactListPage from "./pages/ContactListPage.jsx";
import { Navbar } from './component/navbar';
import { Footer } from './component/footer';

import ContextProvider from '../js/context/Provider.jsx';
import AddContactForm from './pages/AddContactForm';
import EditContactForm from './pages/EditContactForm.jsx';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter basename={basename}>
        <ContextProvider>
          <ScrollToTop>
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<ContactListPage />} />
                <Route path="/add-contact" element={<AddContactForm />} />
                <Route path="/edit-contact/:id" element={<EditContactForm />} />
              </Routes>
            </main>
            <Footer />
          </ScrollToTop>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
