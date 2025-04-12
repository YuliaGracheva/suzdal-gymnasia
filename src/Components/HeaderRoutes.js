import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import News from "../Pages/News";
import SearchPage from "./SearchPage";
import ManagmentBodies from "../Pages/Maines/ManagmentBodies";
import Documents from "../Pages/Maines/Documents";
import AccessibleEnvironment from "../Pages/Maines/AccessibleEnvironment";
import PaidEducationalServices from "../Pages/Maines/PaidEducationalServices";
import FinancialEconomicActivity from "../Pages/Maines/FinancialEconomicActivity";
import VacantPlace from "../Pages/Maines/VacantPlace";
import Scholarships from "../Pages/Maines/Scholarship";
import InternationalCoop from "../Pages/Maines/InternationalCoop";
import OrganizationEat from "../Pages/Maines/OrganizationEat";
import NewsDetail from "../Pages/NewsDetail";
import EducationProcess from "../Pages/Maines/Educations/EducationProcess";
import GIA from "../Pages/Maines/Educations/GIA";

import Contact from "../Pages/About/Contact";
import Message from "../Pages/About/Messages";
import Employee from "../Pages/About/Employee";
import Leadership from "../Pages/About/Leadership";
import Olympiad from "../Pages/About/Olympiad";

import ProcessReception from "../Pages/Reception/ProcessReception";
import FunctionalGramm from "../Pages/Resurs/FunctionalGramm";

import AdminLayout from "../admin-panel/AdminLayout";

export default function HeaderRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/main-info/managment-bodies" element={<ManagmentBodies />} />
      <Route path="/main-info/documents" element={<Documents />} />
      <Route path="/main-info/accessible-environment" element={<AccessibleEnvironment />} />
      <Route path="/main-info/paid-educational-services" element={<PaidEducationalServices />} />
      <Route path="/main-info/financial-economic-activity" element={<FinancialEconomicActivity />} />
      <Route path="/main-info/vacant-place" element={<VacantPlace />} />
      <Route path="/main-info/scholarships" element={<Scholarships />} />
      <Route path="/main-info/international-coop" element={<InternationalCoop />} />
      <Route path="/main-info/organisation-eat" element={<OrganizationEat />} />
      <Route path="/main-info/education/education-process" element={<EducationProcess />} />
      <Route path="/main-info/education/gia" element={<GIA />} />
      <Route path="/resurs/fuctional-gramm" element={<FunctionalGramm />} />
      <Route path="/reception/process-reception" element={<ProcessReception />} />
      <Route path="/about/contact" element={<Contact />} />
      <Route path="/about/employee" element={<Employee />} />
      <Route path="/about/leadership" element={<Leadership />} />
      <Route path="/about/message" element={<Message />} />
      <Route path="/about/olympiads" element={<Olympiad />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
}
