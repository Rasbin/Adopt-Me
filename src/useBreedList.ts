import { useGetBreedsQuery } from "./petApiService";

export default function useBreedList(animal: Animal) {
 const { data: breeds, isLoading} = useGetBreedsQuery(animal, {
  skip: !animal
 });

 if (!animal) {
  return [[], 'loaded'];
 }

 return [breeds ?? [], isLoading ? "loading" : "loaded"];
}
