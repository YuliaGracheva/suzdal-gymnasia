import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home.js";
import News from "../Pages/News.js";
import SearchPage from "./SearchPage.js";
import ManagmentBodies from "../Pages/Maines/ManagmentBodies.js";
import Documents from "../Pages/Maines/Documents.js";
import AccessibleEnvironment from "../Pages/Maines/AccessibleEnvironment.js";
import PaidEducationalServices from "../Pages/Maines/PaidEducationalServices.js";
import FinancialEconomicActivity from "../Pages/Maines/FinancialEconomicActivity.js";
import VacantPlace from "../Pages/Maines/VacantPlace.js";
import Scholarships from "../Pages/Maines/Scholarship.js";
import InternationalCoop from "../Pages/Maines/InternationalCoop.js";
import OrganizationEat from "../Pages/Maines/OrganizationEat.js";
import NewsDetail from "../Pages/NewsDetail.js";
import EducationProcess from "../Pages/Maines/Educations/EducationProcess.js";
import GIA from "../Pages/Maines/Educations/GIA.js";

import Contact from "../Pages/About/Contact.js";
import Message from "../Pages/About/Messages.js";
import Employee from "../Pages/About/Employee.js";
import Leadership from "../Pages/About/Leadership.js";
import Olympiad from "../Pages/About/Olympiad.js";

import ProcessReception from "../Pages/Reception/ProcessReception.js";
import FunctionalGramm from "../Pages/Resurs/FunctionalGramm.js";

import AdminLayout from "../admin-panel/AdminLayout.js";

import ArchiveNews from "../Pages/ArchiveNews.js";

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
      <Route path="/fuctional-gramm" element={<FunctionalGramm />} />
      <Route path="/process-reception" element={<ProcessReception />} />
      <Route path="/about/contact" element={<Contact />} />
      <Route path="/about/employee" element={<Employee />} />
      <Route path="/about/leadership" element={<Leadership />} />
      <Route path="/about/message" element={<Message />} />
      <Route path="/about/olympiads" element={<Olympiad />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/news/:id" element={<NewsDetail />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/news/archive/:year/:month" element={<ArchiveNews />} />
    </Routes>
  );
}
