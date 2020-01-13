import React, { Component } from 'react';
import './App.css';

import { withAuthenticator, PhotoPicker, S3Image, S3Album } from 'aws-amplify-react';
import Amplify,{ Storage, Auth } from 'aws-amplify' 

import config from "./aws-exports";
Amplify.configure(config)

class App extends Component {

  render() {
    return (
      <div>
        <button onClick={() => Auth.signOut()}>サインアウト</button>
          <PhotoPicker preview onPick={data =>{ 
            const { file } = data;
            Storage.put(file.name, file,{
              level: 'public',  // level : public or private
              contentType: file.type
            })
            .then (result => console.log(result)) 
            .catch(err => console.log(err));

          }
        } onLoad={dataURL => console.log(dataURL)} />
      </div>
    )
  }
}

export default withAuthenticator(App);