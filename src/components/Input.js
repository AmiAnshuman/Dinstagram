import React, { Component } from 'react'
import "./Input.css"
export default class Input extends Component {
    render() {
        return (
            
               <>
               <h2>Share Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault();
                const description = this.imageDescription.value;
                this.props.addImage(description);
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.bufferimage} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Image description..."
                        required />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              </>
            
        )
    }
}
