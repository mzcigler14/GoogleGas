import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import NumberInput from "./NumberInput";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useState } from "react";

interface props {
  setOrigin: React.Dispatch<React.SetStateAction<string>>;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
const InputBar = ({
  setOrigin,
  setDestination,
  setDistance,
  setSearch,
}: props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();
  const [origins, setOrigins] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [destinations, setDestinations] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const handleSuggestionsRequest = (
    input: HTMLInputElement,
    setAction: React.Dispatch<
      React.SetStateAction<google.maps.places.AutocompletePrediction[]>
    >
  ) => {
    console.log(input);
    if (input) {
      setAction(data);
    }
  };

  const handleOriginChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(false);
    setValue(e.target.value);
    setOrigin(e.target.value);
    if (e.target instanceof HTMLInputElement && status === "OK") {
      handleSuggestionsRequest(e.target, setOrigins);
    }
  };

  const handleDestinationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(false);
    setValue(e.target.value);
    setDestination(e.target.value);
    if (e.target instanceof HTMLInputElement && status === "OK") {
      handleSuggestionsRequest(e.target, setDestinations);
    }
  };

  const handleFindGas = () => {
    console.log("find gas button clicked");
    setSearch(true);
    setSearch(true);
  };
  return (
    <div className="input-bar">
      <Autocomplete
        disablePortal
        options={origins}
        getOptionLabel={(option) => option.description}
        sx={{ width: 200 }}
        onChange={(event, newValue) => {
          if (newValue) {
            setOrigin(newValue.description);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Origin"
            onChange={(e) => handleOriginChange(e)}
            disabled={!ready}
          />
        )}
      />
      <Autocomplete
        disablePortal
        options={destinations}
        getOptionLabel={(option) => option.description}
        sx={{ width: 200 }}
        onChange={(event, newValue) => {
          if (newValue) {
            setDestination(newValue.description);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Destination"
            onChange={(e) => handleDestinationChange(e)}
            disabled={!ready}
          />
        )}
      />
      <NumberInput setDistance={setDistance}></NumberInput>
      <div>
        <Button
          onClick={handleFindGas}
          style={{ height: "45px", fontSize: "1.25rem", fontWeight: "bold" }}
          variant="contained"
          size="large"
        >
          Find Gas
        </Button>
      </div>
    </div>
  );
};

export default InputBar;
