import { Storage } from 'aws-amplify';

export async function s3Upload(file) {
    // const storedArray = [];
    // files.forEach(async (file, index) => {
    //     const filename = `${Date.now()}-${file.name}`
    //     const stored = storedArray.push(await Storage.vault.put(filename,file, {
    //         contentType: file.type
    //     }).key)
    // })
    
    // return storedArray


  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type
  }).then(res=> console.log(res)).catch((e)=>console.log(e));

  return stored;

}