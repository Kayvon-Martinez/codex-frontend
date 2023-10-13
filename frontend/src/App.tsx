import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationRail from "./components/layout/partials/NavigationRail";
import styled from "styled-components";
import DataPage from "./pages/data/DataPage";

function PlacehoderPage(props: { name: string }) {
  return (
    <div>
      <p
        style={{
          color: "#fff",
        }}
      >
        {props.name}
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper>
        <NavigationRail />

        <Routes>
          <Route path="/" element={PlacehoderPage({ name: "About" })} />
          <Route
            path="/marketplace"
            element={PlacehoderPage({ name: "Marketplace" })}
          />
          <Route path="/data" element={<DataPage />} />
          <Route path="/node" element={PlacehoderPage({ name: "Node" })} />
          <Route path="/debug" element={PlacehoderPage({ name: "Debug" })} />
        </Routes>

        <div id="header-mobile">
          <h1>Dexy</h1>
        </div>
      </AppWrapper>
    </Router>
  );
}

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
