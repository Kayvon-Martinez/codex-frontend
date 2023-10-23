import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationRail from "./components/layout/partials/NavigationRail";
import styled from "styled-components";
import DataPage from "./pages/data/DataPage";
import DebugPage from "./pages/debug/DebugPage";
import SettingsPage from "./pages/settings/SettingsPage";

function PlacehoderPage(props: { name: string }) {
  return (
    <PlacehoderPageWrapper>
      <p
        style={{
          color: "#fff",
        }}
      >
        {props.name}
      </p>
    </PlacehoderPageWrapper>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper>
        <NavigationRail />

        <Routes>
          <Route path="/" element={<SettingsPage />} />
          <Route
            path="/marketplace"
            element={PlacehoderPage({ name: "Marketplace" })}
          />
          <Route path="/data" element={<DataPage />} />
          <Route path="/node" element={PlacehoderPage({ name: "Node" })} />
          <Route path="/debug" element={DebugPage()} />
        </Routes>

        <header id="header-mobile">
          <h1>Dexy</h1>
        </header>
      </AppWrapper>
    </Router>
  );
}

const PlacehoderPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  #header-mobile {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    #header-mobile {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 75px;
      width: 100%;
      background-color: #141414;
      padding: 16px;
    }
  }
`;
