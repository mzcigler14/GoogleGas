import { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { API_KEY } from "../../../API_KEY.js";
import Header from "./components/Header";
import InputBar from "./components/InputBar";

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
  const [origin, setOrigin] = useState<google.maps.LatLng>(
    new google.maps.LatLng(0, 0)
  );
  const [destination, setDestination] = useState<google.maps.LatLng>(
    new google.maps.LatLng(0, 0)
  );
  const [distance, setDistance] = useState(0);
  const directionsService = new google.maps.DirectionsService();
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (search) {
      setDirections(null);
    }
  }, [search]);

  useEffect(() => {
    if (directions === null) {
      console.log("distance", distance);
      calculateRoute();
    }
  }, [directions]);

  const calculateRoute = () => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <>
      <Header></Header>
      <InputBar
        search={search}
        setOrigin={setOrigin}
        setDestination={setDestination}
        setDistance={setDistance}
        setSearch={setSearch}
        onClick={calculateRoute}
      ></InputBar>
      <div className="map-style">
        <GoogleMap mapContainerClassName="map-style" center={origin} zoom={10}>
          {directions !== null && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      </div>
    </>
  );
}
