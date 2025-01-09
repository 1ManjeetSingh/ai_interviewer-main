import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicantPool from './Pages/ApplicantPool'
import AiInterview from "./Pages/aiInterview";
import NonTechnical from './Pages/non_technical';
import ApplicantResult from './Pages/applicantResult';
import Dummy from './Pages/dummy';
import UserDashboard from './Pages/userDashboard';
import Technical from './Pages/technical';
import CourseSummary from "./Pages/courseSummary";
import AfterSelection from "./Pages/afterSelection";
import AiTechnical from "./Pages/aiTechnical";
import LoaderWithIcons from "./Pages/LoaderWithIcons";
import RecruiterDashboard from "./Pages/recruiterDashboard";
import Applicant from "./Pages/applicant";
import RecruiterDashboardElements from "./Pages/recruiterDashboardElements";
import DummyInterface from "./Pages/DummyInterface";
import PostJobMain from "./Pages/postJobMain";
import JobPostUpdater from "./Pages/JobPostUpdater";
import AfterSelectionUpdated from "./Pages/AfterSelectionUpdated";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/afterSelectionUpdated" element={<AfterSelectionUpdated />} />
        <Route path="/applicantPool" element={<ApplicantPool />} />
        <Route path="/aiInterview" element={<AiInterview />} />
        <Route path="/aiTechnical" element={<AiTechnical />} />
        <Route path="/non_technical" element={<NonTechnical />} />
        <Route path='/dummy' element={<Dummy />} />
        <Route path="/applicantResult" element={<ApplicantResult />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/technical" element={<Technical />} />
        <Route path="/afterSelection" element={<AfterSelection />} />
        <Route path="/LoaderWithIcons" element={<LoaderWithIcons />} />
        <Route path="/RecruiterDashboard" element={<RecruiterDashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/applicant" element={<Applicant />} />
        <Route path="/kalangiElements" element={<RecruiterDashboardElements />} />
        <Route path="/dummyInterface" element={<DummyInterface />} />
        <Route path="/postJobMain" element={<PostJobMain />} />
        <Route path="/" element={<CourseSummary />} />
        <Route path="/jobpost_updater" element={<JobPostUpdater />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;