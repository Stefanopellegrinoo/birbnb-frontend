import { useEffect, useRef, useState } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { TextInput } from "@mantine/core";

const libraries = ["places"];

export default function SelectorUbicacion({ 

   onSeleccion 

}) {
    const autocompleteRef = useRef(null);
    const { isLoaded, loadError } = useJsApiLoader({
        id: "places-autocomplete",
        googleMapsApiKey: "AIzaSyB83SPkJy1LtrcSRZvw6253FV3jIwPYSnw",
        libraries,
    });


    if (loadError) {
        return <div>Error cargando Google Maps: {loadError.message}</div>;
    }
    if (!isLoaded) {
        return <div>Cargando autocomplete...</div>;
    }

    const handlePlaceChanged = () => {

        const place = autocompleteRef.current.getPlace();
        if (!place.geometry || !place.address_components) return;

        const getComponent = (type) => {
            const comp = place.address_components.find((c) =>
                c.types.includes(type)
            );
            return comp?.long_name || "";
        };

        const numero = getComponent("street_number");
        const calle = getComponent("route");
        const ciudad =
            getComponent("locality") ||
            getComponent("sublocality") ||
            getComponent("administrative_area_level_2");
        const provincia = getComponent("administrative_area_level_1");
        const pais = getComponent("country");
        const lat = place.geometry.location.lat();
        const lon = place.geometry.location.lng();

        const ubicacion = {
            calle,
            altura: numero,
            ciudad,
            provincia,
            pais,
            lat,
            lon,
        };
        onSeleccion(ubicacion);
    };

    return (
        <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged} 
        >
            <input
                type="text"
                placeholder="Ingresá tu dirección"
                className="ubicacion-input"

            />
       
        </Autocomplete>
    );
}
