import { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { API_KEY } from "../../../API_KEY.js";
import Header from "./components/Header";
import InputBar from "./components/InputBar";

function locOnChange(
  location: string,
  setLoc: React.Dispatch<React.SetStateAction<string>>
) {
  setLoc(location);
}

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <p>Loading in Progress</p>;
  }
  return <AppLoaded />;
}

export default App;

function AppLoaded() {
  const [search, setSearch] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState(0);
  const center = { lat: 50.064192, lng: -130.605469 };
  const options = {
    bounds: {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    },
    componentRestrictions: { country: "cad" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };
  useEffect(() => {
    console.log(search);
    if (search) {
      console.log("hello", distance, destination, origin);
    }
  }, [search]);

  return (
    <>
      <Header></Header>
      <InputBar
        setOrigin={setOrigin}
        setDestination={setDestination}
        setDistance={setDistance}
        setSearch={setSearch}
      ></InputBar>
      <div className="map-style">
        <GoogleMap mapContainerClassName="map-style" center={center} zoom={10}>
          {origin && <Marker position={{ lat: 50.064192, lng: -130.605469 }} />}
        </GoogleMap>
      </div>
    </>
  );
}
