import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchQuery } from './petApiService';
import Results from "./Results";
import useBreedList from "./useBreedList";
import { all } from "./searchParamsSlice";
import { Animal } from "./APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const adoptedPet = useSelector(state => state.adoptedPet.value);
  const searchParams = useSelector(state => state.SearchParams.value);
  const dispatch = useDispatch();

  let { data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal: formData.get("animal")?.toString() as Animal ?? "" as Animal,
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            className="search-input"
            id="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            className="search-input grayed-out-disabled"
            disabled={breeds.length === 0}
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
