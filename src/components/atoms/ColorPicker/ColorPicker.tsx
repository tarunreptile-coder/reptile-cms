import React from "react";
import reactCSS from "reactcss";
import { SketchPicker } from "react-color"


class _ColorPicker extends React.Component {
  
   colorHex = "";
  state = {
    displayColorPicker: false,
    
    color: {

      r: 0,

      g: 0,

      b: 0,

      a: 0,
    },
  };

  hexToRGB = (hex:any) => {
     if(this.props.value){
      hex = this.props.value;
      hex = '0x' + hex?.slice(1, 7)
      this.state.color.r = hex >> 16 & 0xFF 
      this.state.color.g = hex >> 8 & 0xFF
      this.state.color.b= hex & 0xFF
      this.state.color.a=0
      return `rgb(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b})`
     }  
    
  };
  

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color:object) => {
    this.setState({ color: color.rgb });
    this.colorHex = color.hex;
    this.props.onChange(color.hex);
  };


  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "36px",

          height: "14px",

          borderRadius: "2px",

          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },

        swatch: {
          padding: "5px",

          background: this.props.value,

          borderRadius: "1px",

          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",

          display: "inline-block",

          cursor: "pointer",
        },

        popover: {
          position: "absolute",

          zIndex: "2",
        },

        cover: {
          position: "fixed",

          top: "0px",

          right: "0px",

          bottom: "0px",

          left: "0px",
        },
      },
    });
    this.hexToRGB(this.props.value);
    return (

      <div className="custm_color_control">
        <div className="custm_color_control_box" style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>

        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />

            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
              props={this.state.color}
            />
          </div>
        ) : null}

        <div className="hexa_color_box">
          <div className="flex_box">
            {this.colorHex ? (
              <div className="flex_box">
                <h6>Hex </h6>
                <div>
                  {" "}
                  <div className="colors_code">
                    {" "}
                    <span>{this.colorHex}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex_box">
                <h6> Hex </h6>
                <div>
                  <div className="colors_code">
                    <span>{this.props.value}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex_box">
            <h6>RGB</h6>
            <div className="color_code_content">
              <div className="colors_code">
                <span>{this.state.color.r}</span>
                {/* <spand>{this.props.value.toString(16)}</spand> */}
              </div>
              <div className="colors_code">
                <span>{this.state.color.g}</span>
              </div>
              <div className="colors_code">
                <span>{this.state.color.b}</span>
              </div>
              <div className="colors_code">
                <span>{this.state.color.a}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default _ColorPicker;
