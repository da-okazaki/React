import React from 'react';
import { Storage } from 'aws-amplify' 
import { S3Image } from 'aws-amplify-react';

class S3_Image extends React.Component {
  state = {
    files: [],
  }
  
  async componentDidMount() {
    const files = await Storage.list('')
    console.log('files: ', files)
    this.setState({ files })
  }

  render() {
    return (
      <div>
        {
          this.state.files.map((f, i) => (
            <div style={{ width: 200, margin: '0 auto' }} key={i}>
              <S3Image
                imgKey={f.key}
              />
            </div>
          ))
        }        
      </div>
    )
  }
}

export default S3_Image;