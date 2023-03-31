import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import css from "./app.module.css";
import { useState } from "react";

function App() {
  const [branches, setBranches] = useState([]);
  const getAllBranch = async () => {
    try {
      const result = await axios.get("http://localhost:8001/restaurants");
      setBranches(result?.data?.message);
    } catch (err) {
      console.log("ERR", err);
    }
  };
  const getNearBranch = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/restaurants/near?distance=200",
        {
          lat: 47.92394060040875,
          lon: 106.93371541130081,
        }
      );
      setBranches(result.data.branches);
    } catch (err) {
      console.log("ERR", err);
    }
  };
  return (
    <div className={css.app}>
      <h1>газрын зураг</h1>
      <div>
        <button onClick={getAllBranch}>Show all branches</button>
        <button onClick={getNearBranch}>Show nearest branches</button>
      </div>
      <div className={css.map}>
        <MapContainer
          center={[47.923778067105836, 106.93411832087956]}
          zoom={17}
          scrollWheelZoom={true}
          className={css.mapContainer}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {branches?.map((el) => {
            console.log(el, "...");
            return (
              <Marker
                key={el._id}
                position={[
                  el.location.coordinates[1],
                  el.location.coordinates[0],
                ]}
              >
                <Popup>{el.name}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
