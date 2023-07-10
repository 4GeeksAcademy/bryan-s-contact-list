import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './component/scrollToTop';

import ContactListPage from "./pages/ContactListPage.jsx";

import { Navbar } from './component/navbar';
import { Footer } from './component/footer';

import ContextProvider from '../js/context/Provider.jsx';
import AddContactForm from './pages/AddContactForm';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ContextProvider>
          <ScrollToTop>
            <Navbar />
            <Routes>
              <Route path="/" element={<ContactListPage />} />
              <Route path="/add-contact" element={<AddContactForm />} />
            </Routes>
            <Footer />
          </ScrollToTop>
        </ContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
