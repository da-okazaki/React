![](https://github.com/da-okazaki/React/blob/master/react-amplify-storage/amplify_react.png)

## Getting started
##### Create a new React app:

```bash
$ create-react-app react-amplify-storage
$ cd react-amplify-storage
```
##### Install the Amplify libraries:

```bash
$ npm install aws-amplify aws-amplify-react
```

##### Initialize a new amplify app:
```bash
$ amplify init
```
```bash
? Enter a name for the project react-amplify
? Enter a name for the environment develop
? Choose your default editor: Vim (via Terminal, Mac OS only)
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
```

#####  Next, add auth:
```bash
$ amplify add auth
```
```bash
? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No
```

##### Next, add storage:
```bash
$ amplify add storage
```
```bash
? Please select from one of the below mentioned services: Content
? Please provide a friendly name for your resource that will be used to label this category in the project: <resource_name>
? Please provide bucket name: <unique_bucket_name>
? Who should have access: Auth and guest users
? What kind of access do you want for Authenticated users? create, update, read, delete
? What kind of access do you want for Guest users? create, update, read, delete
? Do you want to add a Lambda Trigger for your S3 Bucket? N
```

### Configure the React app with Amplify
##### Open src/index.js and add the following three lines of code:

```JavaScript
// src/index.js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

## Platform specific components
##### Open src/App.js and add the following three lines of code:

### S3 Image
```JavaScript
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
```
