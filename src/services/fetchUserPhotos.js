import firebase from 'firebase';

const fetchUserPhotos = async (user) => {
    const storageRef = firebase.storage();
    const userImagesRef = storageRef.ref().child('images/XH1p44CXVnRL1rTIE4npy0vL9C73');
    let result;

    await userImagesRef.listAll().then(async function(res) {
        result = await Promise.all(res.items.map(async (itemRef)=>{
            const url = await itemRef.getDownloadURL();

            return url;
        }))
    });

    return result;
}

export default fetchUserPhotos;
