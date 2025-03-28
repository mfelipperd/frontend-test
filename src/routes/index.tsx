import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CompanyForm from "../pages/CompanyForm";
import NotFound from "../pages/NotFound";
import { Layout } from "@/components/Layout";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create-company" element={<CompanyForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
