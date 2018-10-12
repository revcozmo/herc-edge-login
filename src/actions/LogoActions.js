

// //  function handleImagePicked(pickerResult) {
// //     console.log("new place for the LogoUP")

// //     if (!pickerResult.cancelled) {
// //         return dispatch =>
// //         dispatch(uploadImageAsync(pickerResult.uri));
// //         // this.setState({ image: uploadUrl });
// //     }
// //     alert("Upload failed, sorry :(");
// // }

// async function uploadAssetLogo(uri) {
//     // setImageinState = url => {
//     //   this.setState({ Logo: url });
//     // };

 
//         const response = await fetch(uri);
//         const blob = await response.blob();
//         const storageRef = firebase.storage().ref();
//         let logoLocation = storageRef.child(this.state.Name + "/Logo");

//         // const snapshot = await logoLocation.put(blob);
//         // console.log(snapshot, 'snapshot')
//         // return snapshot.downloadURL ? snapshot.downloadURL : "notingmon";

//         var uploadTask = logoLocation.put(blob);

//         // Register three observers:
//         // 1. 'state_changed' observer, called any time the state changes
//         // 2. Error observer, called on failure
//         // 3. Completion observer, called on successful completion
//         uploadTask.on(
//             "state_changed",
//             function (snapshot) {
//                 // Observe state change events such as progress, pause, and resume
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 var progress =
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log("Upload is " + progress + "% done");
//                 switch (snapshot.state) {
//                     case firebase.storage.TaskState.PAUSED: // or 'paused'
//                         console.log("Upload is paused");
//                         break;
//                     case firebase.storage.TaskState.RUNNING: // or 'running'
//                         console.log("Upload is running");
//                         break;
//                 }
//             },
//             function (error) {
//                 Alert.alert("Something Went Wrong");
//                 // Handle unsuccessful uploads
//             },
//             function (dispatch) {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//                     console.log("File available at", downloadURL);
//                     dispatch(gotLogo(downloadURL));
//                 });
//             }
//         );
  
//     }
// }

// export function gotLogo(assetLogoUrl) {
//     console.log(assetLogoUrl, "Looking for the Logo URL in firebase storage")
//     return {
//         type: GOT_LOGO,
//         Logo: assetLogoUrl
//     }
// }