import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

define(['react', 'Wix'], function (React, Wix) {
    return React.createClass({
        getInitialState: () => {
            return {
                value: 0
            }
        },
        componentDidMount: function () {
            
            Wix.addEventListener(Wix.Events.SETTINGS_UPDATED, (data) => this.onSettingsUpdate(data));

            // You can get the style params programmatically, un-comment the following snippet to see how it works:
            /*Wix.Styles.getStyleParams(function (style) {
             console.log(style);
             });*/

            // You can also get the style every time it changes, try this:
            /*Wix.addEventListener(Wix.Events.STYLE_PARAMS_CHANGE, function (style) {
             console.log(style);
             });*/
        },
        onSettingsUpdate: function (update) {
            this.setState({
                settingsUpdate: update,
                showBox: true
            }, this.updateCompHeight);
        },
        updateCompHeight: (height) => {
            const desiredHeight = height || document.documentElement.scrollHeight;
            Wix.setHeight(desiredHeight);
        },
        navToHome: () => {
            Wix.getSiteMap(pages => {
                Wix.navigateToPage(pages[0].pageId.substring(1));
            });
        },
        stringify: (input) => {
            try {
                return JSON.stringify(input, null, 4);
            } catch (err) {
                return input;
            }
        },
        getValue: function (event) {
            console.log(this.state.value)
        },
        setValue: function (value) {
            this.setState({value});
        },
        render: function () {
            return (
                <div>
                    <div>
                        <Slider vertical defaultValue={0} onAfterChange={this.setValue.bind(this)}/>
                    
                        <p align="right">{this.state.value}</p>
                    </div>   
                </div>
                
            )
        }
    });
});



