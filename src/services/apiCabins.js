import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {
  const {data, error} = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // https://jqgwthdcwdrjifqngjym.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}.replaceAll('/','')`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  // 1. Create cabin
  let query = supabase.from('cabins');

  // 1.A Creation
  if (!id)
    query = query
      .insert([
        {...newCabin, image: imagePath}
      ]);

  // 1.B Edit
  if (id)
    query = query
      .update({
        ...newCabin,
        image: imagePath
      })
      .eq('id', id);


  const {data, error} = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

//   2. Upload Image
  const {error: storageError} = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

//   3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin could not be created');
  }
}

export async function deleteCabin(id) {
  const {error} = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}